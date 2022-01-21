import Joi from 'joi'
import { HttpCode } from '../lib/constants'
import resError from '../lib/responseError'

export const authValidation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(12),
  })
  try {
    await schema.validateAsync(req.body)
  } catch (e) {
    return res.status(HttpCode.BAD_REQUEST).json(resError.badRequest(e.details[0].message))
  }
  next()
}

export const emailValidation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  })
  try {
    await schema.validateAsync(req.body)
  } catch (e) {
    return res.status(HttpCode.BAD_REQUEST).json(resError.badRequest(e.details[0].message))
  }
  next()
}

export const subscriptionValidation = async (req, res, next) => {
  const schema = Joi.object({
    subscription: Joi.string().valid('starter', 'pro', 'business').required()
  })
  try {
    await schema.validateAsync(req.body)
  } catch (e) {
    return res.status(HttpCode.BAD_REQUEST).json(resError.badRequest(e.details[0].message))
  }
  next()
}
