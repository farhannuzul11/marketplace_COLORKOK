import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define a schema
const Schema = mongoose.Schema;

export const ShopSchema = new Schema({
  //attributes and its data type
  item_name: String,
  old_price: Number,
  new_price: Number,
  item_image: String,
  description: String,
});

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}); 

// Schema untuk Cart
const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [{
    item_id: {
      type: Schema.Types.ObjectId,
      ref: "ShopModel",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    size: {
      type: String,
      default: "S",
    },
  }],
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
      return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
      throw new Error(error);
  }
}

// Compile model from schema
export const ShopModel = mongoose.model("ShopModel", ShopSchema);
export const User = mongoose.model("User", UserSchema);
export const CartModel = mongoose.model("CartModel", CartSchema);
