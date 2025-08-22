import Joi from 'joi';

export const addContactSchema = Joi.object({
  name: Joi.string().min(2).max(100).trim().required(),
  email: Joi.string().email({ tlds: { allow: false } }).trim().required(),
  phone: Joi.string().min(3).max(30).trim().required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(100).trim(),
  email: Joi.string().email({ tlds: { allow: false } }).trim(),
  phone: Joi.string().min(3).max(30).trim(),
}).min(1);
