import React,{useContext, useState} from "react";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import './Navbar.css';
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {

    const [menu, setMenu] = useState('Shop');
    const {getTotalItems} = useContext(ShopContext);
 
  return (
    <div>
      <div className="navbar">
        <div className="nav-logo">
          <img src={logo} alt="" />
          <p>SHOP SHOP</p>
        </div>
            <ul  className="nav-menu">
            <li onClick={() => {setMenu('Shop')}}><Link to={'/'} style={{textDecoration:'none'}}>Shop{menu==='Shop' ? <hr /> : <></>}</Link></li>
            <li onClick={() => {setMenu('Men')}}><Link to={'/mens'} style={{textDecoration:'none'}}>Mens{menu==='Men' ? <hr /> : <></>}</Link></li>
            <li onClick={() => {setMenu('Women')}}><Link to={'/women'} style={{textDecoration:'none'}}>Women{menu==='Women' ? <hr /> : <></>}</Link></li>       
            <li onClick={() => {setMenu('Kids')}}><Link to={'/kids'} style={{textDecoration:'none'}}>Kids{menu==='Kids' ? <hr /> : <></>}</Link></li>
            <hr />
            </ul>
        <div className="nav-login-cart">
            <Link to={'/login'}>{localStorage.getItem('auth-token') ? <button onClick={()=>{
              localStorage.removeItem('auth-token');
              window.location.replace('/')}}>Logout</button> : <button>Login</button>}</Link>
            <Link to={'/cart'}><img src={cart_icon} alt="" /></Link>
        </div>
        <div className="nav-cart-count">{getTotalItems()}</div>

      </div>
    </div>
  );
};

export default Navbar;
