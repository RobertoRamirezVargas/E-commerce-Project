const { MongoClient } = require("mongodb");
const fs = require("fs");
const { companies } = require("./data/companies.json");
const { items } = require("./data/items.json");
require("dotenv").config({ path: "./.env" });
const { Mongo_URI } = process.env;

const companieData = JSON.parse(
  fs.readFileSync("./data/companies.json", "utf8")
);
const itemsData = JSON.parse(fs.readFileSync("./data/items.json", "utf8"));

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbName = "QuantumWear";

// Function to migrateData to mongoDB
const migrateData = async (dbName) => {
  const client = new MongoClient(Mongo_URI, options);
  try {
    await client.connect();
    const db = client.db(dbName);
    const companiesCollection = db.collection("companies");
    const itemsCollection = db.collection("items");

    await companiesCollection.insertMany(companieData);
    await itemsCollection.insertMany(itemsData);
  } catch (error) {
    console.log("An error occurred during data migration:", error);
  } finally {
    await client.close();
  }
};

migrateData(dbName);
