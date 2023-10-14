const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { Mongo_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Function to get the cart content
const getCart = async (req, res) => {
  const client = new MongoClient(Mongo_URI, options);
  const dbName = "QuantumWear";

  try {
    await client.connect();
    const db = client.db(dbName);

    const result = await db.collection("cart").find().toArray();

    if (result) {
      res.status(200).json({ status: 200, data: result });
    } else {
      res.status(400).json({
        status: 400,
        message: "Data not found!",
      });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Server Error" });
  } finally {
    client.close();
  }
};

// Function to add an item to the cart
const addToCart = async (req, res) => {
  const client = new MongoClient(Mongo_URI, options);
  const dbName = "QuantumWear";

  const { _id, name, price, imageSrc, quantity } = req.body;

  try {
    await client.connect();
    const db = client.db(dbName);

    // Check to see if item is already in the cart
    const existingItem = await db.collection("cart").findOne({ _id });

    if (existingItem) {
      await db
        .collection("cart")
        .updateOne(
          { _id },
          { $set: { quantity: existingItem.quantity + quantity } }
        );
    } else {
      // If the item is not in the cart, add it as a new item
      await db.collection("cart").insertOne({
        _id,
        name,
        price,
        imageSrc,
        quantity,
      });
    }

    res.status(200).json({ status: 200, message: "Item added successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, error: "Server Error" });
  } finally {
    client.close();
  }
};

// Function to remove all items from the cart
const removeCart = async (req, res) => {
  const client = new MongoClient(Mongo_URI, options);
  const dbName = "QuantumWear";

  try {
    await client.connect();
    const db = client.db(dbName);

    // Delete all items from the cart
    await db.collection("cart").deleteMany({});

    res
      .status(200)
      .json({ status: 200, message: "All items removed from cart." });
  } catch (error) {
    res.status(500).json({ status: 500, error: "Server Error" });
  } finally {
    client.close();
  }
};

// Function to remove one from cart off an item , if item is quantity is 0 , it deletes it.
const removeOneFromCart = async (req, res) => {
  const client = new MongoClient(Mongo_URI, options);
  const dbName = "QuantumWear";
  const id = parseInt(req.params._id);

  try {
    await client.connect();
    const db = client.db(dbName);

    // Check to see if item is already in the cart
    const existingItem = await db.collection("cart").findOne({ _id: id });

    if (existingItem) {
      if (existingItem.quantity > 0) {
        await db
          .collection("cart")
          .updateOne(
            { _id: id },
            { $set: { quantity: existingItem.quantity - 1 } }
          );

        if (existingItem.quantity === 1) {
          await db.collection("cart").deleteOne({ _id: id });
          res.status(200).json({
            status: 200,
            message: "Item removed from cart successfully",
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Item quantity reduced successfully",
          });
        }
      } else {
        // If the quantity is 0, remove the item from the cart
        await db.collection("cart").deleteOne({ _id: id });
        res.status(200).json({
          status: 200,
          message: "Item removed from cart successfully",
        });
      }
    } else {
      res.status(400).json({ status: 400, message: "Item not found!" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Server error" });
  } finally {
    client.close();
  }
};

module.exports = { getCart, addToCart, removeCart, removeOneFromCart };
