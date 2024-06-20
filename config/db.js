const mongoose = require('mongoose');
const url = process.env.MONGO_URL;

mongoose.connect("mongodb+srv://berrets:VbF4B2JtKhv2YsBx@cluster0.pqae41d.mongodb.net/berrets-db?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log('MongoDB Connected...');
  }).catch((err) => {
    console.log('Error while creating MongoDB connection ', err);
  })