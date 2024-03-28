// Modal.js
import axios from "axios";
import React, { useState } from 'react';
import CryptoJS from 'crypto-js'

import './openAll.css'; // Import CSS file for styling
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';



const openallFile = ({ setOpen ,item }) => {


 
  
  const user = JSON.parse(localStorage.getItem('user'));
  const userid=user._id;
  
   
  const decryptFileUrl = (encryptedFile, key) => {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedFile, key);
    const decryptedFile = decryptedBytes.toString(CryptoJS.enc.Utf8);
    console.log(decryptedFile);
    return decryptedFile;
  };

 const  downloadDocument=()=>{
    // Trigger download by creating a link element
    const link = document.createElement('a');
    link.href = decryptFileUrl(item.file, item.aeskey);
    link.download = item.docname; // Set the desired filename here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

 }
  

  


  return (
    
      
      
        <div className="docall">
        <div className="docall-content">
             
          
          <div className="navtop1">
                <span className="close" onClick={() => setOpen(false)}>&times;</span>
                <h1> Click  folder icon to download</h1>
          </div>
          <div className="center">
            
                
                    <div className="icon1"><FolderSpecialIcon style={{fontSize:40 }} onClick={downloadDocument} /></div>
                    <div className="file1">{item.docname}</div>
                
              


          </div>
          <div className="foot1"></div>
          

          

        </div>
        </div>
      
    
  );
}

export default openallFile;
