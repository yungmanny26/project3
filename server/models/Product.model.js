const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema(
  {
    title: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      imageUrl: {
        type: String,
        required: true
      },
  },
 
);

const Products = mongoose.model("products", ProductsSchema);
module.exports = Products;