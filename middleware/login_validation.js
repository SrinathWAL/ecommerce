//Import the Joi Validator package
const Joi = require('joi');
const expressAsyncHandler = require('express-async-handler');

// Defining the schema
const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required().messages({
    'string.email': 'Invalid Email format',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(4).required().messages({
    'string.min': 'Password must be at least 4 characters',
    'any.required': 'Password is required',
  }),
});

//Validate the Request
const validateLogin = expressAsyncHandler((req, res, next) => {
  const { error } = authSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const details = error.details.map((err) => err.message);
    return res.send({ message: details.toString() });
  }
  next();
});

// Exporting the validateLogin middleware
module.exports = validateLogin;
