// importing express framework
import express from "express";
// importing the controller
import {
  CreateFunction,
  GetFunction,
  GetDetailFunction,
  UpdateFunction,
  DeleteFunction,
} from "./Controller/ShopController.js";
import {
  getUsers,
  saveUser,
  deletedUser,
  loginUser,
} from "./Controller/UserController.js";
import {
  AddToCartFunction,
  DeleteCartFunction,
  GetCartFunction,
  RemoveFromCartFunction,
  UpdateCartFunction,
} from "./Controller/CartController.js";
// importing cors
import cors from "cors";
// importing mongoose, ORM mapping the backend to the database
import mongoose from "mongoose";
// importing dotenv
import dotenv from "dotenv";

// defining the express for this app
const app = express();
const PORT = 3001;
const router = express.Router();
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log("Server is Successfully Running on " + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//Middleware : Enable communications in between app
app.use(cors());
//Accepting data with the type of json
app.use(express.json());

// Route for Item
// Route for Create
router.post("/item", CreateFunction);
// Route for Read
router.get("/item", GetFunction);
// Route for Read Detail Data
router.get("/item/:id", GetDetailFunction);
// Route for Update
router.put("/item/:id", UpdateFunction);
// Route for Delete
router.delete("/item/:id", DeleteFunction);

//Router for User
//get user
router.get("/user", getUsers);
//save user
router.post("/user", saveUser);
//delete user
router.delete("/user/:id", deletedUser);
//logun user
router.post("/user/session", loginUser);

//Router for cart
router.post("/cart", AddToCartFunction);
router.get("/cart/:userId", GetCartFunction);
router.put("/cart/:userId", UpdateCartFunction);
router.delete("/cart/:userId", DeleteCartFunction);
router.delete("/cart/:id/:userId", RemoveFromCartFunction);

const errorFunction = (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
};

app.use(router);
// app.listen(PORT, errorFunction); //tes connect ke database di atas.
