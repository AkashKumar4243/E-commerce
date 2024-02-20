import React from 'react';
import arrow_icon from '../Assets/breadcrum_arrow.png';
import './Breadcrum.css';

const Breadcrum = (props) => {
    const {product} = props;
  return (
    <div className="breadcrum">HOME <img src={arrow_icon} alt="" />SHOP <img src={arrow_icon} alt="" />{product.category} <img src={arrow_icon} alt="" />{product.name} <img src={arrow_icon} alt="" /></div>
  )
}

export default Breadcrum