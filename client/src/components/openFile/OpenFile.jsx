// Modal.js
import axios from "axios";
import React, { useState } from 'react';
import CryptoJS from 'crypto-js'

import './openfile.css'; // Import CSS file for styling
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const OpenFile = ({ setOpen ,item }) => {


 
  
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
    link.download = item.docname; // You can set the desired filename here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

 }
  
   
   

 



    const addtoaccess=async(requestItem)=>{

      try {
        // Replace 'your_document_id' with the actual document ID
       const value1 = requestItem[0] // Replace 'element1' with your actual value
       const value2 = requestItem[1]; // Replace 'element2' with your actual value
       //console.log(document)
       
       const response = await axios.put(`http://localhost:8100/api/doc/updateaccess/${item._id}`, { AccessToAdd: [value1, value2] });
       console.log('Document updated:', response.data.updatedDoc);
       deleterequest(value1)
       window.location.reload();
       
     } catch (error) {
       console.error('Error updating document:', error);
     }


    }

    const deleterequest=async(requestId)=>{
      try {
        
        const response = await axios.delete(`http://localhost:8100/api/doc/${item._id}/request/${requestId}`);
        console.log('Request deleted:', response.data);
        // Assuming you update state or trigger a re-render after deletion
      } catch (error) {
        console.error('Error deleting request:', error);
      }

    }


  return (
    
      
      
        <div className="doc">
        <div className="doc-content">
             
          
          <div className="navtop">
                <span className="close" onClick={() => setOpen(false)}>&times;</span>
                <h1>Click on folder icon to download</h1>
          </div>
          <div className="center">
            <div className="center-left">
                <div className="center-top">
                    <div className="icon"><FolderSpecialIcon style={{fontSize:40 }} onClick={downloadDocument}/></div>
                    <div className="file">{item.docname}</div>
                </div>
                <div className="center-bottom">
                    <div className="access-container">
                        <p>Access Authorized</p>
                        <div className="access">
                          {item.access.map((accessItem, index) => (
                              <div key={index} className="access-doc">
                                  <div className="accessimage">
                               <AccountCircleIcon style={{fontSize:20}}/>
                              </div>
                              <div className="accessname">
                                  <h3>{accessItem[1]}</h3>
                              </div>
                              

                              </div>
                            ))}
                              
                        </div>
                    </div>
                    <div className="request-container">
                        <p> Access request</p>
                        <div className="request">
                        {item.request.map((requestItem, index) => (
                              <div key={index} className="require">
                               <div className="reqimage">
                               <AccountCircleIcon style={{fontSize:20}}/>
                              </div>
                              <div className="reqname">
                                  <h3>{requestItem[1]}</h3>
                              </div>
                              <div className="reqicon">
                                  <CheckCircleIcon style={{fontSize:20}} onClick={()=>addtoaccess(requestItem)}/>
                                  <CancelIcon style={{fontSize:20}} onClick={()=>deleterequest(requestItem[0])}/>
                              </div>

                              </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="center-right">
                <p>File Logs</p>
                <div className="filelogs">
                {item.logs.map((logItem, index) => (
                              <div key={index} className="logs">
                               <div className="logimage">
                               <AccountCircleIcon style={{fontSize:20}}/>
                              </div>
                              <div className="logname">
                                  <h3>{logItem[0]}</h3>
                              </div>
                              <div className="logicon">
                              <h3>{logItem[1]}</h3>
                              </div>

                              </div>
                            ))}
                </div>
            </div>


          </div>
          <div className="foot"></div>
          

          

        </div>
        </div>
      
    
  );
}

export default OpenFile;
