const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `name must be exist`,
    "string.base": `name must be text`,
  }),
  email: Joi.string().required().messages({
    "any.required": `email must be exist`,
    "string.base": `email must be text`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `phone must be exist`,
    "string.base": `phone must be text`,
  }),
});

module.exports = contactSchema;
