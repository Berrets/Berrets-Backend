const DetectModel = require("../models/DetectModel");

module.exports = {
  detectData: async (req, res) => {
    const detectModel = new DetectModel(req.body);
    try {
      const response = await detectModel.save();
      return res.status(201).json({ message: 'Success', data: response });
    } catch (error) {
      return res.status(500).json({ message: 'Error', err });
    }
  },
}