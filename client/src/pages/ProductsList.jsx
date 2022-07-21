import React, { useEffect, useState } from "react";

import { authAxios } from "../customAxios/authAxios";
import { Link } from "react-router-dom";
import axios from 'axios';
const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //Requesting all the products from our database
  //authAxios is custom axios instance, it allows us to send Bearer tokens with the request
  //We are using authAxios here to prevent unauthorized user to view the product list

  const getProducts = async () => {
    const { data } = await authAxios.get(
      `https://nike-outlet.herokuapp.com/api/products`
      
    );
    setProducts(() => data);
  };

  const changeHandler = (e) => {
    setSearchTerm(e.target.value);
  };
  //This useEffect will execute getproducts function only one time when this page loads
  useEffect(() => {
    try {
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }, []); //<-- No dependency, means it will execute only one time
  return (
    <div className="products-heading" key={""}>
      <h2>Products list</h2>
      <div>
        <p>
          Search:{" "}
          <input type="search" value={searchTerm} onChange={changeHandler} />
        </p>
      </div>
      {/* Filter method will filter out all other products which dont contain same search terms based on the book title. */}
      <div key={products._id} className="products-container">
        {products
          .filter((products) =>
            searchTerm.length > 0
              ? products.name
                  .toLocaleLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
              : products
          )

          .map((products) => {
            return (
              <div className="product-card">
                <Link to={products._id}>
                  <img
                    src={products.image && products.image[0]}
                    alt=""
                    width={250}
                    height={250}
                    className="product-image"
                    // key={""}
                  />
                  <div className="product-name">{products.name}</div>
                  <div className="product-price">${products.price}</div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Products;