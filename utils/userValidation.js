const Joi = require('joi');

const userRegisterValidate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    userName: Joi.string().min(4).max(100).required(),
    fullName: Joi.string().min(4).max(100).required(),
    roleUser: Joi.string().min(4).max(100).required(),
    password: Joi.string().min(8).alphanum().required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error })
  }
  next();
}

const userLoginValidate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error })
  }
  next();
}

const userEmailValidate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error: error.details[0].message });
  }
  next();
}

module.exports = {
  userRegisterValidate,
  userLoginValidate,
  userEmailValidate
}