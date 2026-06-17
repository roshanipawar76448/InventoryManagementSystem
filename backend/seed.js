require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const sampleProducts = [
  { name: "Wireless Mouse", category: "Electronics", price: 599, quantity: 25, minStock: 10 },
  { name: "Notebook", category: "Stationery", price: 40, quantity: 3, minStock: 15 },
  { name: "Office Chair", category: "Furniture", price: 4500, quantity: 8, minStock: 5 },
  { name: "Whiteboard Marker", category: "Stationery", price: 20, quantity: 2, minStock: 10 },
  { name: "USB Cable", category: "Electronics", price: 150, quantity: 50, minStock: 20 },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected for seeding");
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log("Sample products inserted");
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));