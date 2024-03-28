import React from 'react'
import "./navbar.css"
import { Link } from 'react-router-dom'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo"> <AdminPanelSettingsIcon/><span>Admin Portal</span></div>
      <ul className="nav-links">
        <li><Link to="/admin">Home</Link></li>
        <li><Link to="/files">All Files</Link></li>
        <li><Link to="/group">Groups</Link></li>
        <li><Link to="/">Logout</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar