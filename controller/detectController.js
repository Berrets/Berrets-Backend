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

  getAllData: async (req, res) => {
    try {
      const data = await DetectModel.find({});
      return res.status(200)
        .json({ data: data });
    } catch (err) {
      return res.status(500)
        .json({ message: 'Error', err });
    }
  },

  getDataById: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await DetectModel.findById(id);
      if (!data) {
        return res.status(404).json({ message: 'Data not found' });
      }
      return res.status(200).json({ data: data });
    } catch (error) {
      return res.status(500).json({ message: 'Error', error });
    }
  }
}