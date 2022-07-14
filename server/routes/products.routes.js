const router = require("express").Router();
require("dotenv").config();
const Stripe = require("stripe");

const stripe = Stripe(`${process.env.STRIPE_SECRET_KEY}`);

const { jwtVerify } = require("../middleware/jwtVerify.middleware");

const { adminVerify } = require("../middleware/adminVerify.middleware");


// **require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

const Product = require("../models/Product.model");


// GET ALL PRODUCTS ROUTE

router.get("/products", jwtVerify, (req, res, next) => {
  // .find() --> always returns an array
  Product.find()
    .then((allProductsFromDB) => {
      // allproductsFromDB is just a placeholder, you can name it however
      res.status(200).json(allProductsFromDB);
    })
    .catch((err) => {
      console.log(
        "An error occurred while getting all other products from DB: ",
        err
      );
      res.status(500).json({ message: "Can not connect" });
    });
});

// CREATE A NEW PRODUCT ROUTE


router.post("/products/newproduct", jwtVerify, adminVerify, (req, res) => {
  console.log("this is what user added in the form: ", req.body);

  const { image, name, details, price } = req.body;

  Product.create({ image, name, details, price })
    .then((newSavedProductFromDB) => {
      // console.log("this is new product: ", newSavedproductFromDB);

      res.status(200).json(newSavedProductFromDB);
    })
    .catch((err) =>
      console.log("Error while saving a new product in the DB: ", err)
    );
});


// UPLOAD image FOR PRODUCT ROUTE


// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("image"), (req, res, next) => {
  console.log("file is: ", req.file);

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  //
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ fileUrl: req.file.path });
});


// GET A PRODUCT DETAILS ROUTE

router.get("/products/:productId", jwtVerify, (req, res) => {
  console.log("The ID is: ", req.params.productId);

  Product.findById(req.params.productId)
    .then((productFromDB) => {
      res.status(200).json(productFromDB);
    })
    .catch((err) =>
      console.log("Error while getting a product details from the DB: ", err)
    );
});

// POST Route: SAVE THE CHANGES AFTER EDITING THE PRODUCT ROUTE

router.post("/products/:productID", jwtVerify, adminVerify, (req, res) => {
  // console.log("updated product: ", req.body);

  const { image, name, details, price } = req.body;

  // product.findByIdAndUpdate(req.params.ProductID, req.body)
  Product.findByIdAndUpdate(
    req.params.productID,
    { image, name, details, price },
    { new: true }
  )
    .then((updatedProductFromDB) => {
      // console.log(updatedProductFromDB);

      res.status(201).json(updatedProductFromDB);
    })
    .catch((err) =>
      console.log(
        "Error while saving the updates in the product to the DB: ",
        err
      )
    );
});


// POST Route: DELETE THE PRODUCT ROUTE

router.delete("/products/:productID", jwtVerify, (req, res) => {
  Product.findByIdAndDelete(req.params.productID)
    .then(() =>
      res.status(200).json({ message: "Product deleted successfully" })
    )
    .catch((err) =>
      console.log("Error while deleting a Product from the DB: ", err)
    );
});

// any new routes file you create you have to EXPORT and you have to link to
// app.js (after: "// Start handling routes here") so the application knows that new file
// is created and some routes will be there too
module.exports = router;

