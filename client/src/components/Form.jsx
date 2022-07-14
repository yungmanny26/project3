import React, { useState } from "react";
import service from "../api/service";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { TextareaAutosize } from "@material-ui/core";

const Form = ({ formData, setFormData, submitHandler, changeHandler }) => {
  // eslint-disable-next-line
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    // console.log(e.target.files[0]);
    const file = e.target.files[0];
    function previewFiles(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setImage(reader.result);
      };
      console.log(image);
    }
    setFile(file);
    console.log(file);
    previewFiles(file);
    uploadData.append("image", e.target.files[0]);
    console.log(uploadData);
    service
      .uploadImage(uploadData)
      .then((response) => {
        console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setFormData(() => ({
          ...formData,
          image: response.fileUrl,
        }));
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };
  return (
    <div style={{ textAlign: "center" }}>
      <form onSubmit={submitHandler}>
        <InputLabel htmlFor="fileInput">
          Image:
          <Input
            type="file"
            id="fileInput"
            name="image"
            onChange={(e) => handleFileUpload(e)}
          />
        </InputLabel>
        <br />
        <InputLabel>Name: </InputLabel>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={changeHandler}
        />
        <br />
        <InputLabel>Details: </InputLabel>
       <TextareaAutosize
          type="text"
          name="details"
          value={formData.details}
          onChange={changeHandler}
        /> 
        <br />
         <InputLabel>Price:</InputLabel>
        <Input
          type="number"
          name="price"
          value={formData.price}
          onChange={changeHandler}
        /> 
        <br />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <img src={image} alt="" />
    </div>
  );
};

export default Form;