import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import './CartItem.css'

const CartItem = () => {

    const {all_product,cartItem,removeFromCart,getTotalAmount} = useContext(ShopContext);

  return (
    <div className="cartItems">
        <div className="cartitem-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove Product</p>
        </div>
        <hr />
        {all_product.map((e)=>{
            if(cartItem[e.id]>0){
                return <div>
                    <div className="cartitem-format cartitem-format-main">
                        <img src={e.image} alt="" className='carticon-product-icon' />
                        <p>{e.name}</p>
                        <p> ₹ {e.new_price} </p>
                        <button className='cartitem-quantity'>{cartItem[e.id]}</button>
                        <p>₹ {[e.new_price]*cartItem[e.id]}</p>
                        <img src={remove_icon} alt="" className='cartitem-remove-icon' onClick={()=>{removeFromCart(e.id)}} />
                    </div>
                    <hr />
                </div>
            } else {
                return null ;
            }
        })}
        <div className="cartitem-down">
            <div className="cartitems-total">
                <h1>Cart Total</h1>
                <div>
                    <div className="cartitem-total-item">
                        <p>Subtotal</p>
                        <p>₹{getTotalAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitem-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitem-total-item">
                        <p>Total</p>
                        <h3>₹{getTotalAmount()}</h3>
                    </div>
                </div>
                <button>PROCEED TO CHECHOUT</button>
            </div>
            <div className="cartitemsPromocode">
                <p>If you have a promo Code , Enter it here</p>
                <div className="cartitems-promo">
                    <input type="text" placeholder='Promo Code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItem;