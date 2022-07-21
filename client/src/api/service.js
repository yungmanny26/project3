import axios from "axios";



const service = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL:"https://nike-outlet.herokuapp.com/api",
  // withCredentials: true, // => you might need this option if using cookies and sessions
});
 
const errorHandler = (err) => {
    throw err;
  };
  
const getProducts = () => {
    return service
      .get("/products")
      .then((res) => res.data)
      .catch(errorHandler);
  };
  
  const uploadImage = (file) => {
    console.log("this is file service", file);
    return service
      .post("/upload", file)
      .then((res) => res.data)
      .catch(errorHandler);
  };
  
  const createProduct = (newproduct) => {
    console.log("new photo in service: ", newproduct);
    return service
      .post("/products", newproduct)
      .then((res) => res.data)
      .catch(errorHandler);
  };
  
  export default {
    service,
    getProducts,
    uploadImage,
    createProduct,
  };