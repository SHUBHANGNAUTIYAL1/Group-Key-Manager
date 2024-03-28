import React from 'react'
import "./navbar.css"
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo"><span>CipherShare</span></div>
      <ul className="nav-links">
        <li><Link to="/about">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/home">Services</Link></li>
        <li><Link to="/">Logout</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar