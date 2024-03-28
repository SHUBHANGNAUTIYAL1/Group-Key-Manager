import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import  './group.css'
import useFetch from '../../hook/useFetch';
import axios from 'axios'
import GroupsIcon from '@mui/icons-material/Groups';

import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useState } from 'react'
import CreateGroup from '../creategroup/CreateGroup';

function Group() {

    const[openRequest,setOpenRequest]=useState(false)

    const user = JSON.parse(localStorage.getItem('user'));
    
    const { data, loading, error }= useFetch(`http://localhost:8100/api/group/`);
  
    console.log(data)
  
   const deleteDocument = async (docId) => {
    try {
      
      await axios.delete(`http://localhost:8100/api/group/${docId}`);
      
      window.location.reload();
      
      alert("Group Removed  successfully");
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
                          <p>Here's All the Group's</p>
                        </div>
                        <div className="butt4">
                           <button className="Add4" onClick={()=>setOpenRequest(!openRequest)}><GroupAddIcon/></button>
                        </div>                   
                    </div>
                    <div className="bottom4">
                    {loading? "Loading":(
                    <>
                       {data.grp?.map((item) => {
                              
                        
                              return <div className="document4" key={item._id} >
                                          <div className="img4">
                                                  <GroupsIcon/>
                                           </div>
                                                  <div className="fname4">
                                                    <p className='na'>{item.name}</p>
                                                    
                                                  </div>
                                                  <div className="icon4">
                                                      <GroupRemoveIcon style={{color:"red"}} onClick={() => deleteDocument(item._id)}/>
                                
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
    {openRequest && <CreateGroup setOpen={setOpenRequest}/>}
    </>
  )
}

export default Group