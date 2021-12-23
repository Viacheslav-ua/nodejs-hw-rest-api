import Joi from 'joi'

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
    return res.status(400).json({ message: error.details[0].message })
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
    return res.status(400).json({ message: error.details[0].message })
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
    return res.status(400).json({ message: error.details[0].message })
  }
  next()
 }