// Modal.js

import React, { useState } from 'react';
import './request.css'; // Import CSS file for styling
import axios from 'axios';
import useFetch from '../../hook/useFetch';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NewAgreement = ({ setOpen }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const useremail=user.email;
    const { data, loading, error } = useFetch(`http://localhost:8100/api/agreement/request/${useremail}`);
    console.log(data);

    const deleteDocument = async (docId) => {
        try {
          
          await axios.delete(`http://localhost:8100/api/agreement/${docId}`);
          
          window.location.reload();
        } catch (error) {
          console.error('Error deleting document:', error);
        }
      };
      const updateAgreement = async (docId) => {
        try {
          
          await axios.put(`http://localhost:8100/api/agreement/update/${docId}`,{
            status:true
          });
          
          window.location.reload();
        } catch (error) {
          console.error('Error updating document:', error);
        }
      };
 
 
  return (
    
      
      
        <div className="modal3">
        <div className="modal-content3">
            <div className="request-header">
                <span className="close" onClick={() => setOpen(false)}>&times;</span>
                <h2>New Requests!!!!</h2>
            </div>
            <div className="request-body">
                {loading?"Loading":(
                    <>
                    {data.agree.map((item)=>{
                        if(!item.status)
                        {
                        return  <div className="req" key={item._id}>
                        <div className="image1">
                            <AccountCircleIcon/>
                        </div>
                        <div className="name3">
                            <h3>{item.sign}</h3>
                        </div>
                        <div className="icon3">
                            <CheckCircleIcon onClick={()=>updateAgreement(item._id)}/>
                            <CancelIcon onClick={() => deleteDocument(item._id)}/>
                        </div>
                    </div>
                        }

                        else{
                            return null;
                        }
                    })}
                    </>
                )}
               
            </div> 
               
            
                
          
        </div>
        </div>
      
    
  );
}

export default NewAgreement;
