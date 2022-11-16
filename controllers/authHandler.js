const usersModel = require("../models/Users.js");
const argon2 = require("argon2");

exports.login = async (req, res) => {
  try {
    const { user, password } = req.body;
    const userDetails = await usersModel.findOne({ user });
    if (!userDetails) {
      return res.status(401).json({
        status: "failed",
        error: "Invalid UserName or Password",
      });
    }
    let validPassword = false;
    try {
      if (await argon2.verify(userDetails.password, password)) {
        validPassword = true;
      } else {
        validPassword = false;
      }
    } catch (err) {
      return res.status(500).json({
        status: "failed",
        error: "Something went wrong",
      });
    }

    if (!validPassword) {
      return res.status(401).json({
        status: "failed",
        error: "Invalid UserName or Password",
      });
    }
    res.status(201).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      err: error.message,
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    const { user, password } = req.body;
    let exists = await usersModel.findOne({ user });
    if (exists) {
      return res.status(400).json({
        status: "failed",
        err: "UserName already exists",
      });
    }
    let hashedPassword;
    try {
      hashedPassword = await argon2.hash(password);
    } catch (err) {
      return res.status(500).json({
        status: "failed",
        err: "Something went wrong",
      });
    }

    const newuser = await usersModel.create({
      user: user,
      password: hashedPassword,
    });
    res.status(201).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      err: err.message,
    });
  }
};
