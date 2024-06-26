const fs = require("fs");
const model = require("../model/product");
const mongoose = require("mongoose");
const Product = model.Product;
// MVC model-veiw-controler

// create
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json({ msg: "Success", product: savedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error saving product" });
  }
};

exports.getAllProduct = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const product = await Product.findById(id);
  res.json(product);
};

exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true, // Return the new document
      upsert: true, // Create the document if it doesn't exist
      returnDocument: "after", // Return the document after update
    });

    if (!doc) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error replacing product" });
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!doc) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error replacing product" });
  }
};
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndDelete({ _id: id });

    if (!doc) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error replacing product" });
  }
};
