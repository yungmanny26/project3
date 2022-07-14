const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: [
          { productId: { type: String }, quantity: { type: Number, default: 1 } },
        ],
        subtotal: { type: Number, required: true },
        total: { type: Number, required: true },
        shipping: { type: Object, required: true },
        payment_status: { type: String, required: true },
      },
      { timestamps: true }
    );

module.exports = mongoose.model("Cart", CartSchema);

exports.Cart = Cart;