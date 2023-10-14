const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { Mongo_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Function to get a specific Product and return it in a RESTful response.
const getProduct = async (req, res) => {
  const client = new MongoClient(Mongo_URI, options);
  const dbName = "QuantumWear";
  const { id } = req.params;

  try {
    await client.connect();
    const db = client.db(dbName);

    const result = await db.collection("items").findOne({ _id: parseInt(id) });

    if (result) {
      res.status(200).json({ status: 200, data: result });
    } else {
      res.status(400).json({
        status: 400,
        message: "Item not found!",
      });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Server Error" });
  } finally {
    client.close();
  }
};

// Function to update a single product stock.
const updateProductStock = async (req, res) => {
  const client = new MongoClient(Mongo_URI, options);
  const dbName = "QuantumWear";
  const { id } = req.params;
  const query = { _id: parseInt(id) };
  const newStockCount = { $set: { numInStock: parseInt(req.body.numInStock) } };

  try {
    await client.connect();
    const db = client.db(dbName);

    if (!req.body.numInStock) {
      res
        .status(400)
        .json({ status: 400, error: "No 'numInStock' value provided" });
      return;
    }

    const stock = Number(req.body.numInStock);

    if (isNaN(stock)) {
      res
        .status(400)
        .json({ status: 400, error: "New numInStock value isn't a number!" });
      return;
    }

    const result = await db.collection("items").updateOne(query, newStockCount);

    if (result.matchedCount === 1 && result.modifiedCount === 1) {
      res.status(200).json({ status: 200, success: true });
    } else {
      res.status(400).json({
        status: 400,
        message: "Item not found!",
      });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Server Error" });
  } finally {
    client.close();
  }
};
module.exports = {
  getProduct,
  updateProductStock,
};
