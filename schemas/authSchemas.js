import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).trim().required(),
  password: Joi.string().min(6).trim().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).trim().required(),
  password: Joi.string().min(6).trim().required(),
});

export const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});
