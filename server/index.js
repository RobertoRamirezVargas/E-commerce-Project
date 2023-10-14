"use strict";

const express = require("express");
const morgan = require("morgan");
const { getProducts, updateProductsStock } = require("./products_handlers");
const { getProduct, updateProductStock } = require("./product_handlers");
const { getCompany } = require("./company_handlers");
const { getCompanies } = require("./companies_handlers");
const {
  getCart,
  addToCart,
  removeCart,
  removeOneFromCart,
} = require("./cart_handlers");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  .get("/product/:id", getProduct)
  .get("/products", getProducts)
  .get("/company/:id", getCompany)
  .get("/companies", getCompanies)
  .patch("/product/:id/stock", updateProductStock)
  .patch("/products/stock", updateProductsStock)
  .get("/cart", getCart)
  .post("/cart/add", addToCart)
  .patch("/cart/remove/:_id", removeOneFromCart)
  .delete("/cart/remove", removeCart)
  .get("/bacon", (req, res) => res.status(200).json("🥓"))

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
