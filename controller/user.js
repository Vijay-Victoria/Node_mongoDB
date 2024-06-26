const fs = require("fs");
// const index=fs.readFileSync('index.html','utf-8')
const model = require("../model/user");
const mongoose = require("mongoose");
// const data=JSON.parse(fs.readFileSync('data.json','utf-8'));
const User = model.User;

exports.getAllUser = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const user = await User.findById(id);
  res.json(user);
};

exports.replaceUser = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await User.findOneAndReplace({ _id: id }, req.body, {
      new: true, // Return the new document
      upsert: true, // Create the document if it doesn't exist
      returnDocument: "after", // Return the document after update
    });

    if (!doc) {
      return res.status(404).json({ msg: "user not found" });
    }

    res.status(200).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error replacing user" });
  }
};
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!doc) {
      return res.status(404).json({ msg: "user not found" });
    }

    res.status(200).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error replacing user" });
  }
};
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await User.findOneAndDelete({ _id: id });

    if (!doc) {
      return res.status(404).json({ msg: "user not found" });
    }

    res.status(200).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error replacing user" });
  }
};
