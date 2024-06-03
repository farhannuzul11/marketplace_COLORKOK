import { ShopModel } from "../Schema/Schema.js";

//Controller for CREATE
export const CreateFunction = async (req, res) => {
  //async : parallel for users
  const { item_name, old_price, new_price, item_image, description } = req.body;
  try {
    const item = new ShopModel({ item_name, old_price, item_image, new_price, description});
    const saveItem = await item.save();
    res.status(201).json(saveItem);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating an item." });
  }
};

//Controller for READ
export const GetFunction = async (req, res) => {
  try {
    const item = await ShopModel.find();
    res.json(item);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the data." });
  }
};

//Controller for READ
export const GetDetailFunction = async (req, res) => {
  try {
    const item = await ShopModel.findById(req.params.id);
    res.json(item);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the data." });
  }
};

//Controller for UPDATE
export const UpdateFunction = async (req, res) => {
  const { item_name, new_price, item_image, item_id, description } = req.body;
  try {
    const updatedItem = await ShopModel.findByIdAndUpdate(
      item_id,
      { item_name, new_price, item_image, description },
      { new: true }
    );
    //returning the updated data
    if (!updatedItem) {
      return res.status(404).json({ error: "item not found" });
    }
    res.json(updatedItem);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the data." });
  }
};

//Controller for DELETE
export const DeleteFunction = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await ShopModel.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(deletedItem);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the data." });
  }
};