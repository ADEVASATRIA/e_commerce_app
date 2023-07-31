const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./middleware/auth');
const listEndpoints = require('express-list-endpoints');

require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.listen(3000, () => {
    console.log('Backend is Running in server http://localhost:3000');
});

// Dapatkan daftar route yang sudah dibuat
const endpoints = listEndpoints(app);
console.log(endpoints);