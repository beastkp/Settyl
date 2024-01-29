import React, { useState, useRef } from "react";
import Editor from "../components/Editor";

const Homepage = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  return (
    <div className="">
      <Editor/>
    </div>
  );
};

export default Homepage;
