const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { Mongo_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Function to get all components and return a RESTful response
const getCompanies = async (req, res) => {
  const client = new MongoClient(Mongo_URI, options);
  const dbName = "QuantumWear";

  try {
    await client.connect();
    const db = client.db(dbName);

    const result = await db.collection("companies").find().toArray();

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

module.exports = {
  getCompanies,
};
