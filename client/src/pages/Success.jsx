import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BsBagCheckFill } from "react-icons/bs";


import { useStateContext } from "../context/StateContext";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(()=> {
      localStorage.clear();
      setCartItems([]);
      setTotalPrice(0);
      setTotalQuantities(0);
      
  },[])

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
        <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for your receipt</p>
        <p className="description">
          If you have any questions, please email{" "}
          <Link className="email" to="mailto:orders@ironhack.com">
            orders@ironhack.com
          </Link>
        </p>
        <Link to="/">
          <button width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;