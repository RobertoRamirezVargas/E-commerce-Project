"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { Mongo_URI } = process.env;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const client = new MongoClient(Mongo_URI, options);

// Function to get all products and return them in a RESTful response.
const getProducts = async (req, res) => {
  try {
    await client.connect();
    const db = client.db("QuantumWear");
    const products = await db.collection("items").find().toArray();
    res.status(200).json({
      status: 200,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "An error occurred retrieving Product name",
    });
  } finally {
    client.close();
  }
};

// Function to update stock on multiple products in a single request.
const updateProductsStock = async (req, res) => {
  const client = new MongoClient(Mongo_URI, options);
  const dbName = "QuantumWear";

  try {
    await client.connect();
    const db = client.db(dbName);

    const productsToUpdate = req.body.products;

    // check to see if array is present or empty
    if (!Array.isArray(productsToUpdate) || productsToUpdate.length === 0) {
      res
        .status(400)
        .json({ status: 400, error: "No products array provided" });
      return;
    }
    // mapping through each array and updating the stock to new quantity
    const updateAllStocks = productsToUpdate.map((product) => {
      const { id, numInStock } = product;
      const query = { _id: parseInt(id) };
      const newStockCount = {
        $set: { numInStock: parseInt(numInStock) },
      };
      return db.collection("items").updateOne(query, newStockCount);
    });

    const results = await Promise.all(updateAllStocks);

    // Every item that has been modified will go into matchedAndModified
    const matchedAndModified = results.every(
      (result) => result.matchedCount === 1 && result.modifiedCount === 1
    );

    if (matchedAndModified) {
      res.status(200).json({ status: 200, success: true });
    } else {
      res.status(400).json({
        status: 400,
        message: "Some items were not found or not updated.",
      });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Server Error" });
  } finally {
    client.close();
  }
};

module.exports = { getProducts, updateProductsStock };
