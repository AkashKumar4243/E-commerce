import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import './Admin.css'


const Admin = () => {
  return (
    <div className="admin">
        <Sidebar />
        <Routes>
            <Route path='/addProduct' element = {<AddProduct />} />
            <Route path='/listProduct' element = {<ListProduct />} />
        </Routes>
    </div>
  )
}

export default Admin