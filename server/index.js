const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 2000;
//connecting db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Failed to connect to db", err);
  });
app.use(cors());
app.use(express.json());
app.get("/health", (req, res) => {
  res.json({
    service: "job listing server",
    status: "Active",
    time: new Date(),
  });
});
app.use("/auth", authRoutes);
app.use("/job", jobRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to home page" });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
