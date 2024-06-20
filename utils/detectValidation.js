const Joi = require('joi');

const detectValidate = (req, res, next) => {
  const schema = Joi.object({
    fileName: Joi.string().min(4).max(100).required(),
    photo: Joi.string().base64().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error: error.details[0].message });
  }
  next();
}

module.exports = {
  detectValidate
};
