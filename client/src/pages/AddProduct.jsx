import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../components";
import { authAxios } from "../customAxios/authAxios";

const AddProduct = () => {
  const defaultFormData = {
    image: "",
    name: "",
    details: "",
    price: 0,
  };
  const [formData, setFormData] = useState(defaultFormData);

  const navigateTo = useNavigate();

  const addNewProduct = async () => {
    // eslint-disable-next-line
    const { data } = await authAxios.post(
      `https://ecommerce-project3.herokuapp.com/products/newproduct`,
      formData
    );
    navigateTo("/products");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      addNewProduct();
    } catch (error) {
      console.error(error);
    }
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="products-heading">
      <h1>Add a new product</h1>
      <br />
      <Form
        formData={formData}
        setFormData={setFormData}
        submitHandler={submitHandler}
        changeHandler={changeHandler}
      />
    </div>
  );
};

export default AddProduct;