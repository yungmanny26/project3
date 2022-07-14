import React, { useContext, useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import { Form, Product } from "../components";
import { useStateContext } from "../context/StateContext";
import { authAxios } from "../customAxios/authAxios";

const ProductDetails = () => {
  const { user } = useContext(UserContext);
  const defaultFormData = {
    image: ["", "", "", ""],
    name: "",
    details: "",
    price: 0,
  };
  //get id from the url
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [product, setProduct] = useState(null);
  const [editToggler, setEditToggler] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  const [index, setIndex] = useState(0);
  //    getting product detail from database using id
  const getProductsDetails = async () => {
    const { data } = await authAxios.get(
      `https://ecommerce-project3.herokuapp.com/products/${id}`
    );
    setProduct(() => data);
    setFormData(() => data);
  };
  
  const updateProductDetail = async () => {
    const { data } = await authAxios.post(
      `https://ecommerce-project3.herokuapp.com/products/${id}`,
      formData
    );
    setProduct(() => data);
    setEditToggler(() => !editToggler);
  };

  const deleteProduct = async () => {
    // eslint-disable-next-line
    const { data } = await authAxios.delete(
      `https://ecommerce-project3.herokuapp.com/products/${id}`
    );
    navigateTo("/products");
  };

  useEffect(
    () => {
      try {
        getProductsDetails();
      } catch (error) {
        console.log(error);
      }
    },
    // eslint-disable-next-line
    [id]
  );

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    try {
      updateProductDetail();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = () => {
    try {
      deleteProduct();
    } catch (error) {}
  };

  const editHandler = (e) => {
    setEditToggler(() => !editToggler);
  };
  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          {/* main product image */}
          <div className="image-container">
            <img
              src={product?.image[index]}
              alt="product pic"
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {product?.image.map((item, i) => (
              <img
                src={item}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
                alt="other pic"
              />
            ))}
          </div>
        </div>
        {product && !editToggler && (
          <div className="product-detail-desc" key={product._id}>
            <h1>{product.name}</h1>
            <div className="reviews">
              <div>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              {/* number of reviews */}
              <p>(20)</p>
            </div>
            <h4>Details:</h4>
            <p>{product.details}</p>
            <p className="price">${product.price}</p>
            <div className="quantity">
              <h3>Quantity:</h3>
              <p className="quantity-desc">
                <span className="minus" onClick={decQty}>
                  <AiOutlineMinus />
                </span>
                <span className="num">{qty}</span>
                <span className="plus" onClick={incQty}>
                  <AiOutlinePlus />
                </span>
              </p>
            </div>
            <div className="buttons">
              <button
                className="add-to-cart"
                onClick={() => onAdd(product, qty)}
              >
                Add to Cart
              </button>
              <button className="buy-now" onClick={handleBuyNow}>
                Buy Now
              </button>
              {user.role === "admin" && (
                <>
                  <button className="add-to-cart" onClick={editHandler}>
                    Edit
                  </button>

                  <button className="buy-now" onClick={deleteHandler}>
                    🗑
                  </button>
                </>
              )}
            </div>
            <div className="maylike-products-wrapper">
              <h2>You may also like</h2>
              <div className="marquee">
                <div className="maylike-products-container track">
                  {product.image.map((item) => (
                    <Product />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {editToggler && (
        <div>
          <Form
            formData={formData}
            submitHandler={submitHandler}
            changeHandler={changeHandler}
            editHandler={editHandler}
          />
          <button className="btn" onClick={editHandler}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;