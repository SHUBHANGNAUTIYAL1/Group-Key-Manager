import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import "./home.css"
import Dashbaord from '../../components/dashboard/Dashboard'
import NewDocument from '../../components/newdocument/NewDocument'
import {useState} from "react"
import useFetch from '../../hook/useFetch';
import NotificationsIcon from '@mui/icons-material/Notifications';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import axios from "axios"
import OpenFile from '../../components/openFile/OpenFile'


function Home() {
  const [opendocmodal, setOpendocModal]=useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [item,setItem]=useState(null); // State to track the clicked document

  const handleDocumentClick = (document) => {
    setItem(document);
    setSelectedDocument(document);
  };


  const user = JSON.parse(localStorage.getItem('user'));
  
  const { data, loading, error } = useFetch(`http://localhost:8100/api/doc/user/${user._id}`);
 console.log(data);


 const deleteDocument = async (docId) => {
  try {
    
    await axios.delete(`http://localhost:8100/api/doc/${docId}`);
    
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
              <Dashbaord/>
              <div className="container1">
                    <div className="top2">
                       <div className="title">
                          <p>Your Documents</p>
                       </div>
                       <div className="butt">
                          <button className="Add1" onClick={()=>setOpendocModal(!opendocmodal)}>ADD<span className='plus'>+</span></button>
                       </div>
                    </div>
                    <div className="bottom">
                    {loading? "Loading":(
                    <>
                       {data.docs.map((item) => {
                        return <div className="document8" key={item._id} onClick={() => handleDocumentClick(item)}>
                                <div className="img">
                                <FolderSpecialIcon/>
                                </div>
                                <div className="fname">
                                  <p>{item.docname}</p>
                                </div>
                                <div className="icon">
                                {Object.keys(item.request).length !== 0 && ( // Check if 'access' object is not empty
                                    <NotificationsIcon style={{ color: "red" }} />
                                  )}
                                <DeleteIcon onClick={() => deleteDocument(item._id)}/>
                                
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
        {opendocmodal && <NewDocument setOpen={setOpendocModal} />}
        {selectedDocument && <OpenFile setOpen={setSelectedDocument} item={item}/>}
        
     
    </>
  )
}

export default Home