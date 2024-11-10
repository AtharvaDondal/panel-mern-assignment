const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/authRoute");

require("dotenv").config(); // Load environment variables from .env file

// 1) MIDDLEWARES
app.use(cors());
app.use(express.json());

// 2) ROUTES
app.use("/api/auth", authRouter);

// 3) MONGO DB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to Mongo DB"))
  .catch((error) => console.log("failed to connect to MongoDB", error));
// 4) GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// 5) SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is listening on PORT: ${port}`);
});
