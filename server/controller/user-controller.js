const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const HttpError = require("../middleware/http-error");

const getUserInfoById = async (req, res) => {
  const userId = req.params.userId;
  const indentifyUser = await User.findById(userId);
  if (!indentifyUser) {
    return;
  }
  res.json({ username: indentifyUser.username, email: indentifyUser.email });
};

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const existUser = await User.findOne({ email: email });
  if (existUser) {
    return next(new HttpError("Email is already Exist!"));
  }
  let hashedpassword = await bcryptjs.hash(password, 12);
  try {
    const newUser = new User({
      username,
      email,
      password: hashedpassword,
    });

    await newUser.save();
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      "dontshare",
      { expiresIn: "1h" }
    );

    res.json({
      userId: newUser._id,
      email: newUser.email,
      username: newUser.username,
      token: token,
    });
    console.log(newUser);
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const identifyUser = await User.findOne({ email: email });
  if (!identifyUser) {
    return next(new HttpError("Invalid credentials!"));
  }
  let isValidPassword = await bcryptjs.compare(password, identifyUser.password);
  console.log(identifyUser.password);
  console.log();
  if (!isValidPassword) {
    return next(new HttpError("Invalid credentials!"));
  }

  const token = jwt.sign(
    { userId: identifyUser._id, email: identifyUser.email },
    "dontshare",
    { expiresIn: "1h" }
  );
  res.json({
    userId: identifyUser._id,
    email: identifyUser.email,
    username: identifyUser.username,
    token: token,
  });
};

const editUser = async (req, res) => {
  const { username, email } = req.body;
  const userId = req.params.userId;
  const user = await User.findById(userId);
  user.email = email;
  user.username = username;
  await user.save();

  const token = jwt.sign({ userId: user._id, email: user.email }, "dontshare", {
    expiresIn: "1h",
  });
  res.json({
    userId: user._id,
    email: user.email,
    username: user.username,
    token: token,
  });
};

exports.getUserInfoById = getUserInfoById;
exports.editUser = editUser;
exports.signup = signup;
exports.login = login;
