import React, { useEffect } from 'react'
import { useState } from 'react'
import cross_icon from '../../assets/Admin Panel Assets/cross_icon.png'
import './ListProduct.css'

const ListProduct = () => {

  const [allProducts,setAllProducts] = useState ([]);
  const remove_product = async(id) =>{
    await fetch ('http://localhost:4000/removeProduct',{
      method : 'Post',
      headers : {
        Accept : 'application/json',
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({id : id})
    })
    await fetchInfo();
  }

  const fetchInfo = async () =>{
    await fetch('http://localhost:4000/allProduct').
    then((res) => res.json()).then((data) => {setAllProducts(data)});
  }

  useEffect (() =>{
    fetchInfo();
  }
  ,[]);

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>Offer Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproduct">
        <hr />
        {allProducts.map((product , index) =>{
          return <div key={index} className='listproduct-format-main listproduct-format' >
            <>
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>₹ {product.old_price}</p>
            <p>₹ {product.new_price}</p>
            <p>{product.category}</p>
            <img src={cross_icon} alt="" className="listproduct-removeicon" onClick={() => {remove_product(product.id)}} />
            </>
            <hr />
          </div>
        })}
      </div>
    </div>
  )
}

export default ListProduct