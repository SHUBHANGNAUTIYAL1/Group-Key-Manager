// Modal.js

import React, { useState } from 'react';
import './newagreement.css'; // Import CSS file for styling
import axios from 'axios';

const NewAgreement = ({ setOpen }) => {

  const user = JSON.parse(localStorage.getItem('user'));
  const userid=user._id;
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload file to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "upload");

      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dh6zjine0/image/upload",
        formData
      );
      
      // Get the file URL from Cloudinary response
      const fileUrl = uploadRes.data.url;

      // Create FormData object and append form data
   // Add file URL

      // Make POST request to backend
      const response = await axios.post("http://localhost:8100/api/agreement/create-agreement",
      {
        docname:fileName,
        email:email,
        sign:fullName,
        file:fileUrl,
        userId:userid

      });
      window.location.reload();
      alert("agreement request sent successfully");
      // Display success message or handle response as needed
      console.log("Agreement created successfully:", response.data);

      // Close the modal
      setOpen(false);
    } catch (error) {
      console.error("Error creating agreement:", error);
      // Handle error
    }
  };


  return (
    
      
      
        <div className="modal">
        <div className="modal-content">
                <span className="close" onClick={() => setOpen(false)}>&times;</span>
                <h2>Share New Files!!!!</h2>
               
            
                <form >
                <input type="file" className="file"  onChange={handleFileChange} required/>
                <input type="text" placeholder="Enter File Name here!!!" className='filename'  value={fileName} onChange={handleFileNameChange} required/>
                <input type="email" placeholder="Enter Email of other person"  className='email'  value={email} onChange={handleEmailChange} required/>
                <input type="text" placeholder ="Enter your full name for Digital signature" className='name' value={fullName} onChange={handleFullNameChange}  required/>
                <button className='submit' onClick={handleSubmit} >Submit</button>
                </form>
          
        </div>
        </div>
      
    
  );
}

export default NewAgreement;
