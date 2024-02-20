import React, { useEffect, useState } from 'react';
//import new_collections from '../Assets/new_collections';
import Item from '../Item/Item';
import './NewCollection.css'

const NewCollection = () => {

  const [newCollection,setNewCollection] = useState([]);

  useEffect(() =>{
    fetch ('http://localhost:4000/newCollection').
    then((res) => res.json()).then((data) => setNewCollection(data));
  },[]);

  return (
    <div className="newCollection">
        <h1>NEW COLLECTION</h1>
        <hr />
        <div className="Collection">
        {newCollection.map((item,i) =>{
                return <Item key = {i} id={item.id} image = {item.image} name = {item.name} old_prices = {item.old_price}  new_prices = {item.new_price} />
            })}
        </div>
    </div>
  )
}

export default NewCollection