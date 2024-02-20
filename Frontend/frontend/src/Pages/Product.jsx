import React, { useContext } from "react";
import Breadcrum from '../Component/Breadcrum/Breadcrum';
import ProductDisplay from '../Component/ProductDisplay/ProductDisplay';
import { useParams } from 'react-router-dom';
import Description from '../Component/DescriptionBox/Description';
import RelatedProduct from '../Component/RelatedProduct/RelatedProduct';
import { ShopContext } from "../Context/ShopContext";

const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e)=> e.id===Number(productId));
 // console.log(Number(productId));
 
  return (
    <div>
      <Breadcrum product = {product} />
      <ProductDisplay product = {product} />
      <Description />
      <RelatedProduct />
    </div>
  )
}

export default Product;