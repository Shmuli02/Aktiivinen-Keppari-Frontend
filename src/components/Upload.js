import React, { useRef } from "react";
import S3 from "react-aws-s3";

function Upload(taskId) {
  const fileInput = useRef();
  const handleClick = async (event) => {
    event.preventDefault();
    let file = fileInput.current.files[0];
    let newFileName = fileInput.current.files[0].name.replace(/\..+$/, "");
    let dirName
    try {
      dirName = taskId.taskId.taskId
    } catch {
      dirName= process.env.REACT_APP_DIR_NAME
    }
    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_REGION,
      dirName: dirName,
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    };
  
    const ReactS3Client = new S3(config);
    const data = await ReactS3Client.uploadFile(file, newFileName)
      console.log(data);
      if (data.status === 204) {
        console.log("success :)");
      } else {
        console.log("fail :(");
      }
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
