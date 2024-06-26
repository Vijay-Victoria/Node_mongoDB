require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const publicKey = fs.readFileSync(
  path.resolve(__dirname, "./public.key"),
  "utf-8"
);

const server = express();
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

console.log("env", process.env.DB_PASSWORD);

async function connectToDatabase() {
  try {
    await mongoose.connect(
      "mongodb+srv://vijaykumargng:pWkjMnhuF98D2xa1@cluster0.aurcmwu.mongodb.net/ecommerceDatabase?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // 30 seconds
        socketTimeoutMS: 45000, // 45 seconds
      }
    );
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Failed to connect to MongoDB Atlas", error);
  }
}

// Enable mongoose debug mode
mongoose.set("debug", true);

connectToDatabase();

//bodyParser

const auth = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return res.status(401).json({ msg: "Authorization header missing" });
    }

    const token = authHeader.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Token missing from header" });
    }

    const decoded = jwt.verify(token, publicKey);
    if (!decoded || !decoded.email) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    // Attach the decoded token to the request object for use in other routes
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Unauthorized: " + err.message });
  }
};
server.use(cors());
server.use(express.json());
server.use(morgan("combined"));
server.use(express.static(path.resolve(process.env.BUILD_DIR)));
server.use("/auth", authRouter.router);
server.use("/products", auth, productRouter.router);
server.use("/user", auth, userRouter.router);
// url to use  
// http://localhost:8080/products
// http://localhost:8080/auth/login
// http://localhost:8080/auth/signUp
// http://localhost:8080/user
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

server.listen(process.env.PORT, () => {
  console.log("server Started");
});
