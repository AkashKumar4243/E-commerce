import React from 'react';
import data_product from '../Assets/data';
import Item from '../Item/Item';
import './RelatedProduct.css'

const RelatedProduct = () => {
  return (
    <div className="relatedproducts">
        <h1>Related Product</h1>
        <hr />
        <div className="relatedproduct-item">
            {
                data_product.map((item,i)=>{
                    return <Item key = {i} id={item.id} image = {item.image} name = {item.name} old_prices = {item.old_price}  new_prices = {item.new_price} /> 
                })
            }
        </div>
    </div>
  )
}

export default RelatedProduct