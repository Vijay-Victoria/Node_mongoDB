const model = require("../model/user");
const jwt = require("jsonwebtoken");
const User = model.User;
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf-8"
);

// MVC model-veiw-controler
exports.createUser = (req, res) => {
  const user = new User(req.body);
  var token = jwt.sign({ email: req.body.email }, privateKey, {
    algorithm: "RS256",
  });
  const hash = bcrypt.hashSync(req.body.password, 10);

  user.token = token;
  user.password = hash;
  user.save((err, doc) => {
    console.log({ err, doc });
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(doc);
    }
  });
};

exports.login = async (req, res) => {
  try {
    // console.log(req.body, 'h1');
    const { email, password } = req.body;
    // console.log(email, 'hi');
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const doc = await User.findOne({ email });
    if (!doc) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    const isAuth = bcrypt.compareSync(password, doc.password);
    if (isAuth) {
      const token = jwt.sign({ email: email }, privateKey, {
        algorithm: "RS256",
      });
      res.json({ token });
    } else {
      res.status(401).json({ msg: "Invalid email or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};
