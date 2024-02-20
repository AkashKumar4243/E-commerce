import React, { createContext, useEffect, useState } from "react";
//import all_product from "../Component/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let Cart = {};
  for (let index = 0; index < 100 + 1; index++) {
    Cart[index] = 0;
  }
  return Cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItem, setCartItem] = useState(getDefaultCart());

  useEffect(() => {
    fetch("http://localhost:4000/allProduct")
      .then((res) => res.json())
      .then((data) => {setAllProduct(data)});

      // Get cart data 
      if(localStorage.getItem('auth-token')){
        fetch("http://localhost:4000/getCart",{
          method : 'Post',
          headers : {
            Accept : 'application/json',
            'auth-token' : `${localStorage.getItem('auth-token')}`,
            'Content-Type' : 'application/json'
          },
          body : ""
        }).then((res) => res.json()).then((data) => setCartItem(data));
      }
      // console.log(cartItem);
  }, []);

  // console.log(all_product);

 
  //console.log(cartItem);

  const addToCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/addToCart',{
        method : 'POST',
        headers : {
          Accept : 'application/json',
          'auth-token' : `${localStorage.getItem('auth-token')}`,
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({'itemId' : itemId})
      }).then((res) => res.json()).then((data) => console.log(data))
    }
  };

  const removeFromCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/removeFromCart", {
        method: "Post",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "ItemId": itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItem[item];
      }
    }
    return totalAmount;
  };

  const getTotalItems = () => {
    let totalItem = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        totalItem = totalItem + cartItem[item];
      }
    }
    return totalItem;
  };
  console.log(getTotalItems());
  const contextValue = {
    all_product,
    cartItem,
    addToCart,
    removeFromCart,
    getTotalAmount,
    getTotalItems,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
