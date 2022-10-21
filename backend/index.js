const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth-route");
const userRoute = require("./routes/user-route");

const PORT = 8000;
dotenv.config();

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("CONNECTED TO MONGO DB");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

connect();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

//Routes
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);

app.listen(PORT, () => {
  console.log("Server is running");
});

//Authentication

//Authorization
