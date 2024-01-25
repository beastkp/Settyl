import React,{useState,useRef} from 'react'
import JoditEditor from "jodit-react";

const Editor = () => {
 const editor = useRef(null);
 const [content, setContent] = useState("");

 return (
   <div className="">
     <JoditEditor
       ref={editor}
       value={content}
       onChange={(newContent) => setContent(newContent)}
     />
   </div>
 );
}

export default Editor