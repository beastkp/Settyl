import React, { useState } from "react";
// import  nodemailer from "nodemailer";
const nodemailer = require("nodemailer");
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../redux/features/modalSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const {user} = useSelector((state)=>state.user);
  const [email,setEmail] = useState('');
  const [message,setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendEmail = async()=>{
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: ``,
        pass: "your-password",
      },
    });
  }
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
          <div className="flex flex-col">
            <label className="text-start pt-2 pl-2">Email: </label>
            <input type="email" className="border-black p-2 m-2 " value={email} />
            <label className="text-start pt-2 pl-2">
              Write your mail here:{" "}
            </label>
            <textarea name="" id="" rows="4" className="p-2 m-2" value={message} ></textarea>
          </div>
          <div className="flex justify-center">
            <button className="p-2 m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded" >
              Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
