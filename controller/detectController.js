const UserModel = require("../models/DetectModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  detectGrain: async (req, res) => {
    const { fileName, photo } = req.body;
    try {
      const newDetect = new DetectModel({
        fileName,
        photo: Buffer.from(photo, 'base64')
      });
  
      await newDetect.save();
      return res.status(201).json({ message: 'Success', data: response });
    } catch (error) {
      return res.status(500).json({ message: 'Error', err });
    }
  },
}