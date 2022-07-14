const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema(
  {
    image: Array,
    name: String,
    details: String,
    price: Number,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
 
);

const Products = mongoose.model("products", ProductsSchema);
module.exports = Products;