const DetectModel = require("../models/DetectModel");

module.exports = {
  createData: async (req, res) => {
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
  },

  updateData: async (req, res) => {
    const { id } = req.params;
    const { fileName } = req.body;
    try {
      const updatedFileName = await DetectModel.findByIdAndUpdate(
        id,
        { fileName },
        { new: true }
      );

      if (!updatedFileName) {
        return res.status(404).json({ message: 'Data not found' });
      }

      return res.status(200).json({ message: 'Update successful', data: updatedFileName });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating data', error });
    }
  },

  deleteData: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedData = await DetectModel.findByIdAndDelete(id);

      if (!deletedData) {
        return res.status(404).json({ message: 'Data not found' });
      }

      return res.status(200).json({ message: 'Delete successful', data: deletedData });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting data', error });
    }
  }

}