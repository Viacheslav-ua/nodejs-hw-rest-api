import Joi from 'joi'

export const postValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).trim().required(),
    email: Joi.string().min(4).max(255).trim().email().required(),
    phone: Joi.string().min(2).max(20).trim().required(),
  })
  return schema.validate(data)
}

export const patchValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).trim(),
    email: Joi.string().min(4).max(255).trim().email(),
    phone: Joi.string().min(2).max(20).trim(),
  })
  return schema.validate(data)
}
