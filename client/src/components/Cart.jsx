import React, { useRef, useState } from "react";
import {
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStripe } from "@stripe/react-stripe-js";
import { useStateContext } from "../context/StateContext";
import { Link } from "react-router-dom";
import { fetchFromAPI } from "../helpers";



const Cart = () => {

  const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const { user } = useContext(UserContext);
  const [username, setUsername] = useState();
  const stripe = useStripe();
  const cartRef = useRef();

  const handleGuestCheckout = async (e) => {
    e.preventDefault();

    const line_items = cartItems.map((item) => {
      return {
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: item.price * 100, //amount is in cents
          product_data: {
            name: item.name,
            description: item.details,
            images: [item.image[0]],
          },
        },
      };
    });
    setIsLoading(true);
    const response = await fetchFromAPI("create-checkout-session", {
      body: { line_items},
    });
    console.log("redirectToCheckout", line_items);
    const { sessionId } = response;
    const { error } = await sessionId.redirectToCheckout({ sessionId });
    setIsLoading(false);
    if (error) {
      console.log(error);
    }
  };

  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items )</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link to="products">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <img
                  src={item?.image[0]}
                  alt=""
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice.toFixed(2)}</h3>
            </div>
            <form onSubmit={handleGuestCheckout}>
              <div className="btn-container">
                
                <button
                  type="submit"
                  className="btn"
                  cartItems={cartItems}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Pay with Stripe"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;