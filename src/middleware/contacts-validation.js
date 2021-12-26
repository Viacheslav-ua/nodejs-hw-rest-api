import Joi from 'joi'
import {HttpCode} from '../lib/constans'

export const postValidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).trim().required(),
    email: Joi.string().min(4).max(255).trim().email().required(),
    phone: Joi.string().min(2).max(20).trim().required(),
    favorite: Joi.boolean(),
  })
  try {
    await schema.validateAsync(req.body)
  } catch (error) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: error.details[0].message,
    })
 }
  next()
}

export const patchValidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).trim(),
    email: Joi.string().min(4).max(255).trim().email(),
    phone: Joi.string().min(2).max(20).trim(),
    favorite: Joi.boolean(),
  }).or('name', 'email', 'phone', 'favorite')
  try {
    await schema.validateAsync(req.body)
  } catch (error) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: error.details[0].message,
    })
  }
  next()
}

 export const idValidation = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().length(24).pattern(/^[0-9a-f]*$/)
  });
  try {
    await schema.validateAsync(req.params)
  } catch (error) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: error.details[0].message,
    })
  }
  next()
}
 
export const queryValidation = async (req, res, next) => {
  const schema = Joi.object({
    limit: Joi.string().pattern(/\d+/).optional(),
    skip: Joi.string().pattern(/\d+/).optional(),
    sortBy: Joi.string().valid('name', 'email', 'createdAt', 'updatedAt', 'phone' ).optional(),
    sortByDesc: Joi.string().valid('name', 'email', 'createdAt', 'updatedAt', 'phone').optional(),
    filter: Joi.string() .pattern(/(name|email|favorite|phone)\\|(name|email|favorite|phone)/).optional(),
  })
  try {
    await schema.validateAsync(req.query)
  } catch (error) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: error.details[0].message,
    })
  }
  next()
}