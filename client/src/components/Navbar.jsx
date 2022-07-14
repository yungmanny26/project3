import React from "react";
import { NavLink, Link } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";
// import UserContext from '../context/UserContext';

const styles = {
  display: 'flex',
  justifyContent: 'space-around',
};

//Key difference between Link and NavLink is to have access of this "isActive" object.
const activeStyle = ({ isActive }) => {
  return { color: isActive ? 'Red' : 'black' };
};

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  // const { user } = useContext(UserContext);
  return (
    <>
    <div className="navbar-container" style={styles}>
      <p className="logo">
        <Link to={"/"}>Nike Outlet</Link>
      </p>
      <NavLink to="login" style={activeStyle}>Login</NavLink>
      <NavLink to="products" style={activeStyle}>Products</NavLink>
      {/* {user.role === 'admin' && ( */}
        <>
        <NavLink to="addproduct" style={activeStyle}> Add a product</NavLink>
        </>
      {/* )} */}
      <button
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">
        {totalQuantities}
        
        </span>
      </button>
      {showCart && <Cart />}
    </div>
    </>
  );
};

export default Navbar;