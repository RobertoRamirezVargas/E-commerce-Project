"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { Mongo_URI } = process.env;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const client = new MongoClient(Mongo_URI, options);

// Function to get a specific Company and return it in a RESTful response.
const getCompany = async (req, res) => {
  const db = client.db("QuantumWear");
  const { id } = req.params;

  try {
    await client.connect();

    const company = await db
      .collection("companies")
      .findOne({ _id: parseInt(id) });

    if (company) {
      res.status(200).json({
        status: 200,
        data: company,
      });
    } else {
      res.status(400).json({
        status: 400,
        error: "Company not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      error: "An error occurred retrieving Companie name ",
    });
  } finally {
    client.close();
  }
};
module.exports = { getCompany };
