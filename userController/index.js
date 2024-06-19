const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  registerUser: async (req, res) => {
    const userModel = new UserModel(req.body);
    userModel.password = await bcrypt.hash(req.body.password, 10);
    try {
      const response = await userModel.save();
      response.password = undefined;
      return res.status(201).json({ message: 'Success', data: response });
    } catch (err) {
      return res.status(500).json({ message: 'Error', err });
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401)
          .json({ message: "Auth failed, invalid email/password" });
      }

      const isPassEqual = await bcrypt.compare(req.body.password, user.password);
      if (!isPassEqual) {
        return res.status(401)
          .json({ message: "Auth failed, invalid email/password" });
      }

      const tokenObject = {
        _id: user._id,
        email: user.email,
        userName: user.userName,
        fullName: user.fullName,
        roleUser: user.roleUser
      }

      const jwtToken = jwt.sign(tokenObject, process.env.SECRET, { expiresIn: '30h' });

      return res.status(200)
        .json({ jwtToken, tokenObject });

    } catch (err) {
      return res.status(500).json({ message: "Error", err });
    }
  },

  getEmailUser: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        return res.status(409).json({ message: 'Email already registered' });
      } else {
        return res.status(200).json({ message: 'Email not registered' });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Error', err });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await UserModel.find({}, { password: 0 });
      return res.status(200)
        .json({ data: users });
    } catch (err) {
      return res.status(500)
        .json({ message: 'Error', err });
    }
  }
}