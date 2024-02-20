import React, { useContext } from "react";
import Item from "../Component/Item/Item";
import dropdown_icon from "../Component/Assets/dropdown_icon.png";
import { ShopContext } from "../Context/ShopContext";
import "./css/ShopCategory.css";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  //console.log(all_product);
  return (
    <div className="shop-category">
      <img src={props.banner} alt="" className="shopcategory-banner" />
      <div className="shopCategory-indexSort">
        <p>
          <span>showing 1-12 </span>out of 36
        </p>
        <div className="shopCategory-sort">
          Sort By
          <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="adjustProduct">
        <div className="shopCategory-products">
          {all_product.map((item, i) => {
            if (props.category === item.category) {
              return (
                <Item
                  key={i}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  old_prices={item.old_price}
                  new_prices={item.new_price}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
      <button className="shopCategory-loadmore">Explore</button>
    </div>
  );
};

export default ShopCategory;
