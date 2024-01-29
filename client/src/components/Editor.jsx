import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";

const Editor = () => {
  const [editor, setEditor] = useState(null);
  const [content, setContent] = useState("");
  const { user } = useSelector((state) => state.user);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

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
    socket.on("getOnlineUsers", (res)=>{
      setOnlineUsers(res);
    })

    // console.log(onlineUsers);

    return () => {
      socket.off("addUser");
      socket.off("getOnlineUsers");
    }
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;
    const updatedContent = {
      content: content,
      email: user?.email,
    }

    // console.log("This is updated content: ",updatedContent);
    socket.emit("changeContent",updatedContent);

    // console.log("this is content: ",content);

     socket.on("getContent", (res) => {
       console.log("This is get content: ",res);
       setContent(res.content);
     });

     return () => {
       socket.off("getContent");
     };
  },[content])

  //change client content from backend
  // useEffect(()=>{
  //   if(socket=== null) return 
  //   socket.on("getContent",res=>{
  //     console.log(res);
  //     setContent((prev)=> [...prev,res])
  //   })

    
  //   return ()=>{
  //     socket.off("getContent")
  //   }
    
  // },[content])
  
  // console.log(content);
  return (
    <div className="">
      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />
    </div>
  );
};

export default Editor;
