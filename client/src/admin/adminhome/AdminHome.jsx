import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import  './admin.css'
import useFetch from '../../hook/useFetch';
import axios from 'axios'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UserCreate from '../usercreate/UserCreate'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useState } from 'react'

function AdminHome() {

    const[openRequest,setOpenRequest]=useState(false)

    const user = JSON.parse(localStorage.getItem('user'));
    
    const { data, loading, error }= useFetch(`http://localhost:8100/api/auth/`);
  
    console.log(data)
  
   const deleteDocument = async (docId) => {
    try {
      
      await axios.delete(`http://localhost:8100/api/auth/${docId}`);
      
      window.location.reload();
      
      alert("User Removed Successfully successfully");
      // Display success message or handle response as needed
    

      
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };
  


  return (
    <>
    <Navbar/>
    <div className="home-container4">
              
              <div className="container4">
                    <div className="top4">
                        <div className="header4">
                          <p>Hi Admin Welcome Back</p>
                        </div>
                        <div className="butt4">
                           <button className="Add4" onClick={()=>setOpenRequest(!openRequest)}><PersonAddIcon/></button>
                        </div>                   
                    </div>
                    <div className="bottom4">
                    {loading? "Loading":(
                    <>
                       {data.user?.map((item) => {
                              if(item.role!='admin'){
                        
                              return <div className="document4" key={item._id} >
                                          <div className="img4">
                                                  <AccountCircleIcon/>
                                           </div>
                                                  <div className="fname4">
                                                    <p className='na'>{item.username}</p>
                                                    <p className='ro'>{item.role}</p>
                                                  </div>
                                                  <div className="icon4">
                                                      <PersonRemoveIcon style={{color:"red"}} onClick={() => deleteDocument(item._id)}/>
                                
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
    {openRequest && <UserCreate setOpen={setOpenRequest}/>}
    </>
  )
}

export default AdminHome