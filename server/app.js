// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const bodyParser = require("body-parser");

const app = express();

require("./db");

require("dotenv/config");
// const cloudinary = require("./config/cloudinary.config");

const fs = require("fs");

const createCheckoutSession = require("./api/checkout");

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/index.routes");

app.use("/api", allRoutes);


const productsRoutes = require("./routes/products.routes");
app.use("/", productsRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

app.post("/create-checkout-session", createCheckoutSession);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);
// const port = 8080

// app.listen(process.env.PORT, () =>
//   console.log("server listening on port", process.env.PORT)
// );
module.exports = app;