import React, { useEffect, useState } from 'react';
//import data_product from '../Assets/data';
import Item from '../Item/Item';
import './popular.css'

const Popular = () => {

  const [popular,setPopular] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/popularInWomen').
    then((res) => res.json()).then((data) => setPopular(data));
  },[]);

  return (
    <div className="popular">
        <h1>Popular in Women</h1>
        {/* console.log(data_product); */}
        <hr />
        <div className="popular-item">
            {popular.map((item,i) =>{
                return <Item key = {i} id={item.id} image = {item.image} name = {item.name} old_prices = {item.old_price}  new_prices = {item.new_price} />
            })}
        </div>
    </div>
  )
}

export default Popular