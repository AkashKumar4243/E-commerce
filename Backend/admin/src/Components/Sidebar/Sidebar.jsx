import React from 'react'
import add_prodduct_icon from "../../assets/Admin Panel Assets/Product_Cart.svg";
import list_product_icon from "../../assets/Admin Panel Assets/Product_list_icon.svg";
import {Link} from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
        <Link to = {'/addProduct'} style={{"textDecoration" : "none"}}>
            <div className="sidebar-item">
                <img src={add_prodduct_icon} alt="" />
                <p>Add Product</p>
            </div>
        </Link>

        <Link to = {'/listProduct'} style={{"textDecoration" : "none"}}>
            <div className="sidebar-item">
                <img src={list_product_icon} alt="" />
                <p>Product List</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar;