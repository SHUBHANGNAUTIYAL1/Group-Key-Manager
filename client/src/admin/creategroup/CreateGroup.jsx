import React from 'react'
import './creategroup.css'
import axios from 'axios'
import useFetch from '../../hook/useFetch';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function CreateGroup({setOpen}) {

    
    const [Name, setName] = useState("");
    const [members, setMembers] = useState([]); 
    const user = JSON.parse(localStorage.getItem('user'));
    const { data, loading, error }= useFetch(`http://localhost:8100/api/auth/`);
    
    const handleSubmit=async(e)=>{

        e.preventDefault();
        try {
 
          const response = await axios.post("http://localhost:8100/api/group/create",
          {
            name:Name,
            user:user._id,
            members:members
    
          });
          window.location.reload();
          alert("group create successfully");
        
        } catch (error) {
          console.error("Error creating grp:", error);
          // Handle error
        }


    }
    const handleNamechange=(e)=>{
        setName(e.target.value);
        console.log(Name)

    }
    const handleUserChange = (index, e) => {
        const updatedMembers = [...members];
        updatedMembers[index] = e.target.value;
        setMembers(updatedMembers);
       
    };

    console.log(members)


  return (
    <div className="group-modal">
        <div className="group-content">
                <span className="close" onClick={() => setOpen(false)}>&times;</span>
                <h2>Create New Group</h2>
                <form onSubmit={handleSubmit}>
                <div className="form-group8">
                    <label htmlFor="name">Group Name</label>
                    <input type="text" value={Name}  onChange={handleNamechange} required />
                   
                </div>
                {[1, 2, 3,4].map((index) => (
                        <div className="form-group8" key={index}>
                            <label>Member{index}</label>
                            <input list={`options-${index}`} onChange={(e) => handleUserChange(index - 1, e)} />
                            <datalist id={`options-${index}`}>
                            {loading? "Loading":(
                    <>
                       {data.user?.map((item) => {
                            if(item.username!="Admin")
                            return <option  value={item._id} >{item.username}</option>
                            else return null
                            
                         })}
                        </> 
                        )
                      } 
                    
                            </datalist>
                        </div>
                    ))}

  

                
            
            
               
                
                
            
                <button className="Register-button" type="submit">Create Group</button>
            </form>
               
               
                
          
        </div>
        </div>
  )
}

export default CreateGroup