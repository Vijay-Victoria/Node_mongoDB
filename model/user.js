const mongoose = require("mongoose");
const { token } = require("morgan");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String },
  lastName: String,
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
    required: true,
  },
  password: { type: String, minLength: 6, required: true },
  token: String,
});

exports.User = mongoose.model("Users", userSchema);
