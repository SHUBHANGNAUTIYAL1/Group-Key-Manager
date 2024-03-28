import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import "./agreement.css"
import usefe from  "../../hook/usefe"
import Dashboard from '../../components/dashboard/Dashboard'
import NewAgreement from '../../components/newagreement/NewAgreement'
import { useState } from 'react'
import useFetch from '../../hook/useFetch';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import axios from "axios"
import Request from '../../components/request/Request'

function Agreements() {
  const [opendocmodal, setOpendocModal]=useState(false)
  const[openRequest,setOpenRequest]=useState(false)
  const user = JSON.parse(localStorage.getItem('user'));
  const Useremail=user.email;
  console.log(Useremail)

  
  const { data, loading, error } = useFetch(`http://localhost:8100/api/agreement/${user._id}`);
  const { data1, loading1, error1 } = usefe(`http://localhost:8100/api/agreement/request/${user.email}`);

  console.log(data.agree)

 const deleteDocument = async (docId) => {
  try {
    
    await axios.delete(`http://localhost:8100/api/agreement/${docId}`);
    
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
                          <p>Here's All your Shared Files</p>
                        </div>
                        <div className="butt2">
                           <button className="Add" onClick={()=>setOpenRequest(!openRequest)}>Requests</button>
                           <button className="Add" onClick={()=>setOpendocModal(!opendocmodal)}>Add<span className='plus'>+</span></button>
                        </div>                   
                    </div>
                    <div className="bottom">
                    {loading? "Loading":(
                    <>
                       {data.agree.map((item) => {
                        if(item.status)
                           {
                              return <div className="document2" key={item._id}>
                                          <div className="img1">
                                                  <FolderSpecialIcon/>
                                           </div>
                                                  <div className="fname1">
                                                    <p>{item.docname}</p>
                                                  </div>
                                                  <div className="icon1">
                                                      <FileDownloadIcon onClick={() => downloadDocument(item.file)}/>
                                                      <DeleteIcon onClick={() => deleteDocument(item._id)}/>
                                
                                                   </div>
                                     </div>
                           }
                           else{
                                return null;
                             }  
                         })}
                        </> 
                        )
                      } 
                       {loading1? "Loading":(
                    <>
                       {data1.agree.map((item) => {
                        if(item.status)
                           {
                              return <div className="document2" key={item._id}>
                                          <div className="img1">
                                                  <FolderSpecialIcon/>
                                           </div>
                                                  <div className="fname1">
                                                    <p>{item.docname}</p>
                                                  </div>
                                                  <div className="icon1">
                                                      <FileDownloadIcon onClick={() => downloadDocument(item.file)}/>
                                                      <DeleteIcon onClick={() => deleteDocument(item._id)}/>
                                
                                                   </div>
                                     </div>
                           }
                           else{
                                return null;
                             }  
                         })}
                        </> 
                        )
                      } 
                   
                       
                    
                      
                    </div>
              </div>
            </div>
         
        
        <Footer/>
        {opendocmodal && <NewAgreement setOpen={setOpendocModal} />}
        {openRequest && <Request setOpen={setOpenRequest}/>}
     
    </>
  )
}

export default Agreements