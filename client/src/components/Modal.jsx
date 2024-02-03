import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../redux/features/modalSlice";
import axios from "axios";

const Modal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const { user } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent,setSent] = useState(false);

  const handleClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/sendMail",
        {
          recipientMail: email,
          message,
          name: user?.email,
          link: "http://localhost:5173/",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(res.status===200){
        console.log(res);
        dispatch(closeModal())
        setSent(true);
      }
      else{
        console.log("Cannot send mail",res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed z-50 flex items-center justify-center">
      {modal.showModal && (
        <div className="flex flex-col w-[500px] bg-slate-200">
          <div className="flex justify-between border-b-2">
            <h1 className="p-2 m-2 font-semibold">Share this Document</h1>
            <IoCloseOutline
              className="text-2xl hover:bg-slate-300 rounded-full"
              onClick={() => dispatch(closeModal())}
            />
          </div>
          {sent && (
            <p className="fixed top-[5%] right-[5%] z-10 rounded-md bg-slate-100 p-2 h-7">
              Email Sent Successfully!!!
            </p>
          )}
          <div className="flex flex-col">
            <label className="text-start pt-2 pl-2">To : </label>
            <input
              type="email"
              className="border-black p-2 m-2 "
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="text-start pt-2 pl-2">
              Write your message here :{" "}
            </label>
            <textarea
              name=""
              id=""
              rows="4"
              className="p-2 m-2"
              value={message}
              placeholder="Enter message"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              className="p-2 m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
              onClick={handleClick}
            >
              Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
