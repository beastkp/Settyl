import React, { useState, useRef } from "react";
import Editor from "../components/Editor";
import { useDispatch,useSelector } from "react-redux";

const Homepage = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const {user} = useSelector((state)=>state.user);

  return (
    <div className="z-0">
      <Editor currentEmail={user?.email} />
    </div>
  );
};

export default Homepage;
