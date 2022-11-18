require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const router = require("./routes");

const port = 5000;

const cors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
};

const app = express();

app.use(express.json());

app.use(cors);

app.use((req, res, next) => {
  next();
});

app.use("/api", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/dist/keep"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "frontend", "dist", "keep", "index.html")
    );
  });
  console.log(__dirname);
}

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to mongodb");
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
