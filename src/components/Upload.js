import React, { useRef } from "react";
import S3 from "react-aws-s3";
import uploadServise from '../services/uploads'

function Upload(taskId) {
  const fileInput = useRef();
  const handleClick = async (event) => {
    event.preventDefault();
    const u = await uploadServise.create(fileInput)
  };
  
  return (
    <>
      <form className='upload-steps' onSubmit={handleClick}>
        <label>
          Upload file:
          <input type='file' ref={fileInput} />
        </label>
        <br />
        <button type='submit'>Upload</button>
      </form>
    </>
  );
}

export default Upload;
