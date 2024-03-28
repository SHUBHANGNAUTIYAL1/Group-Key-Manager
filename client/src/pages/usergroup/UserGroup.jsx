import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import "./usergroup.css"
import usefe from  "../../hook/usefe"
import Dashboard from '../../components/dashboard/Dashboard'
import { useState } from 'react'
import useFetch from '../../hook/useFetch';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import axios from "axios"

import GroupFile from '../grpfile/GroupFile'

function UserGroup() {
  const [opendocmodal, setOpendocModal]=useState(false)
  
  const user = JSON.parse(localStorage.getItem('user'));
  const Useremail=user.email;
  console.log(Useremail)

  
  const { data, loading, error } = useFetch(`http://localhost:8100/api/group/user/${user._id}`);
  
  let groupname=''
  let groupid
  if (data && data.grp && data.grp.length > 0) {
    groupid=data.grp[0]._id
    groupname=data.grp[0].name;
} else {
    console.log('No data or data.grp is empty.');
}
const { data1, loading1, error1 } = usefe(`http://localhost:8100/api/file/get/${groupid}`);
  //groupname=data.grp.name.toUpperCase()
  console.log(data1.docs)

 const deleteDocument = async (docId) => {
  try {
    
    await axios.delete(`http://localhost:8100/api/file/${docId}`);
    
    window.location.reload();
  } catch (error) {
    console.error('Error deleting document:', error);
  }
};

// Function to download a document
const downloadDocument = (docUrl) => {
  // Trigger download by creating a link element
  const link = document.createElement('a');
  link.href = docUrl;
  link.download = 'document'; // You can set the desired filename here
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};



  return (
    <>
       
        <Navbar/>
         
            <div className="home-container">
              <Dashboard/>
              <div className="container2">
                    <div className="top">
                        <div className="header">
                          <p>{groupname.toUpperCase()}</p>
                        </div>
                        <div className="butt2">
                          <button className="Add" onClick={()=>setOpendocModal(!opendocmodal)}>Add<span className='plus'>+</span></button>
                        </div>                   
                    </div>
                    <div className="bottom">
                      
                    {loading1? "Loading":(
                    <>
                       {data1.docs?.map((item) => {
                        return <div className="document8" key={item._id} onClick={() => handleDocumentClick(item)}>
                                <div className="img">
                                <FolderSpecialIcon/>
                                </div>
                                <div className="fname">
                                  <p>{item.docname}</p>
                                </div>
                                <div className="icon">
                                <FileDownloadIcon onClick={() => downloadDocument(item.file)}/>
                                <DeleteIcon  style={{color:"red"}} onClick={() => deleteDocument(item._id)}/>
                                
                                </div>
                        </div>
                         })}
                        </> 
                        )
                      } 
                  
                   
                       
                    
                      
                    </div>
              </div>
            </div>
         
        
        <Footer/>
        {opendocmodal && <GroupFile setOpen={setOpendocModal} grpid={groupid} />}
       
     
    </>
  )
}

export default UserGroup