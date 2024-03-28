import React from 'react'
import "./dashboard.css"
import { useNavigate } from 'react-router-dom'

function Dashbaord() {

  const navigate=useNavigate();

  const HandleHome=()=>{
    navigate('/home');
  }

  const HandleAgreement=()=>{
    navigate('/agreement');
  }
  
  const HandleAll=()=>{
    navigate('/all');
  }
  const HandleGroup=()=>{
    navigate('/usergroup');
  }

  return (
    <div className="dashboard">
      <div className="item " onClick={HandleHome}><p>Personal Documents</p></div>
      <div className="item" onClick={HandleAgreement}><p>Shared Files</p></div>
      <div className="item" onClick={HandleAll}><p>All Files</p></div>
      <div className="item" onClick={HandleGroup}><p>Groups</p></div>
    
        
    </div>
  )
}

export default Dashbaord