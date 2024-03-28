import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import "./allfiles.css"
import Dashbaord from '../../components/dashboard/Dashboard'
import NewDocument from '../../components/newdocument/NewDocument'
import {useState} from "react"
import useFetch from '../../hook/useFetch';
import moment from 'moment'

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import axios from "axios"
import Openallfile from '../../components/openAllFiles/openallfile'


function Allfiles() {

  const user1 = JSON.parse(localStorage.getItem('user'));
  
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [item,setItem]=useState(null); // State to track the clicked document

  const handleDocumentClick = async(document) => {
    const found = document.access.some(row => row.includes(user1._id));
        if (found) {
            console.log(`Element ${user1._id} found in at least one row.`);
            
            try {
              // Replace 'your_document_id' with the actual document ID
             const value1 = user1.username; // Replace 'element1' with your actual value
             const value2 =  moment().format('HH:mm'); // Replace 'element2' with your actual value
             console.log(document)
             
             const response = await axios.put(`http://localhost:8100/api/doc/log/${document._id}`, { logToAdd: [value1, value2] });
             console.log('Document updated:', response.data.updatedDoc);
           } catch (error) {
             console.error('Error updating document:', error);
           }



            setItem(document);
            setSelectedDocument(document);
        } else {
            console.log(`Element ${user1._id} not found in any row.`);
            alert("you don't have an access to this document, access request is sent to the owner")
            try {
               // Replace 'your_document_id' with the actual document ID
              const value1 = user1._id; // Replace 'element1' with your actual value
              const value2 = user1.username; // Replace 'element2' with your actual value
              console.log(document)
              
              const response = await axios.put(`http://localhost:8100/api/doc/update/${document._id}`, { requestToAdd: [value1, value2] });
              console.log('Document updated:', response.data.updatedDoc);
            } catch (error) {
              console.error('Error updating document:', error);
            }
        }
   
  };


  
  console.log(user1)
  
  const { data, loading, error } = useFetch(`http://localhost:8100/api/doc/`);
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
                          <p>All Users Documents</p>
                       </div>
                       
                    </div>
                    <div className="bottom">
                    {loading? "Loading":(
                    <>
                       {data.docs.map((item) => {
                        if(item.user!=user1._id){
                      
                        return <div className="document1" key={item._id} onClick={() => handleDocumentClick(item)}>
                                <div className="img">
                                <FolderSpecialIcon/>
                                </div>
                                <div className="fname">
                                  <p>{item.docname}</p>
                                </div>
                              
                        </div>
                        }
                        else {
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
        
        {selectedDocument && <Openallfile setOpen={setSelectedDocument} item={item}/>}
        
     
    </>
  )
}

export default Allfiles