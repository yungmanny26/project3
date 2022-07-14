import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authAxios } from "../customAxios/authAxios";

const Product = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const { data } = await authAxios.get(
      `localhost:3000/products`
    );
    setProducts(() => data);
  };

  useEffect(() => {
    try {
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="maylike-products-container">
      {products.map((product) => {
        return (
          <div className="product-card" key={product.image[0]}>
            <Link to={`/products/${product._id}`}>
              <img
                src={product.image[0]}
                alt="product main pic"
                width={250}
                height={250}
                className="product-image"
              />
              <div className="product-name">{product.name}</div>
              <div className="product-price">${product.price}</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Product;