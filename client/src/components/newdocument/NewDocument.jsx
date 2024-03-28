// Modal.js
import axios from "axios";
import React, { useState } from 'react';
import CryptoJS from 'crypto-js'

import './newdocument.css'; // Import CSS file for styling



const NewDocument = ({ setOpen }) => {


 
  
  const user = JSON.parse(localStorage.getItem('user'));
  const userid=user._id;
  
   
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleFileNameChange = (e) => {
      setFileName(e.target.value);
    };

    const encryptFileUrl = (url, key) => {
      const encryptedFile= CryptoJS.AES.encrypt(url, key).toString();
      console.log(encryptedFile)
      return encryptedFile;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Upload file to Cloudinary
       const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "upload"); // Replace 'upload' with your upload preset
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dh6zjine0/image/upload",
          formData
        );
        const fileUrl = uploadRes.data.url;
        const key="YourSecretKey";
        const encryptedFile = encryptFileUrl(fileUrl,key);
        //console.log(typeof(fileUrl))
        //console.log(userid)
   
        console.log("hi");
        
  
      
        await axios.post("http://localhost:8100/api/doc/upload-single", {
          docname:fileName,
          file:encryptedFile,
          userId:userid,
          aeskey:key,

        });
        alert("Document Added Successfully")
        window.location.reload();

  
        // Close the modal
        setOpen(false);
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle error
      }
    };


  return (
    
      
      
        <div className="modal1">
        <div className="modal-content1">
          <span className="close" onClick={() => setOpen(false)}>&times;</span>
          <h2>Upload Your Document Here!!!!</h2>
          <form >
          <input type="file" className="file" onChange={handleFileChange} />
          <input type="text" placeholder="Enter File Name here!!!" className='file2' value={fileName} onChange={handleFileNameChange} />
          </form>
          <button onClick={handleSubmit} className="button">Submit</button>
        </div>
        </div>
      
    
  );
}

export default NewDocument;
