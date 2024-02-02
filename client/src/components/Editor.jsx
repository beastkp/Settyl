import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { openModal, closeModal } from "../redux/features/modalSlice";
import Modal from "./Modal";

const Editor = ({ currentEmail }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { user } = useSelector((state) => state.user);
  const modal = useSelector((state) => state.modal);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const newSocket = io("http://localhost:3000");

    setSocket(newSocket);

    newSocket.on("connect", () => {
      // console.log(newSocket.id);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addUser", user?.email);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });

    // console.log(onlineUsers);

    return () => {
      socket.off("addUser");
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;
    const updatedContent = {
      content: content,
      email: user?.email,
    };

    // console.log("This is updated content: ",updatedContent);
    socket.emit("changeContent", updatedContent);

    // console.log("this is content: ",content);

    socket.on("getContent", (res) => {
      // console.log("This is get content: ", res);
      if (user?.email !== currentEmail) editor.current.value = res.content; // this statement is needed otherwise it wont work
      setContent(res.content);
    });

    return () => {
      socket.off("getContent");
    };
  }, [content, socket, currentEmail]);

  return (
    <div className="">
      <div className="flex justify-end">
        {modal.showModal === false ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded fixed"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              dispatch(openModal());
              setTimeout(() => setCopied(false), 2000);
            }}
          >
            Share
          </button>
        ) : null}
        {modal.showModal && <Modal />}
        {copied && (
          <p className="fixed top-[10%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
            Link Copied Successfully!
          </p>
        )}
      </div>

      <div className="flex flex-col py-10 ">
        <h1 className="text-4xl font-bold text-center p-5">Editor</h1>

        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
          className=""
        />
      </div>
    </div>
  );
};

export default Editor;
