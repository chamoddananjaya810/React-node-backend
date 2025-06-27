const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require('./router');

const app = express();
const port = 3001;
const host = 'localhost';

// ✅ Add CORS and JSON middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Atlas URI (replace with your actual credentials)

const mongoURI = "mongodb+srv://chamoo:admin@cluster0.ccnxaxq.mongodb.net/crud";

// ✅ Use router
app.use('/api', router);


mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");

    // ✅ Start server
    app.listen(port, host, () => {
      console.log(`✅ Server running at http://${host}:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

 