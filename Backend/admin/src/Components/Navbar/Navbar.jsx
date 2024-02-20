import React from 'react'
import navLogo from "../../assets/Admin Panel Assets/nav-logo.svg"
import navProfile from "../../assets/Admin Panel Assets/nav-profile.svg"
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
        <img src={navLogo} alt="" className="nav-logo" />
        <img src={navProfile} alt="" className="nav-profile" />
    </div>
  )
}

export default Navbar