import Joi from 'joi'

export const postValidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).trim().required(),
    email: Joi.string().min(4).max(255).trim().email().required(),
    phone: Joi.string().min(2).max(20).trim().required(),
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
  }).or('name', 'email', 'phone')
  try {
    await schema.validateAsync(req.body)
  } catch (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
  next()
}

export const intId = (req, res, next) => {
  const { id } = req.params
  const idInt = parseInt(id)
  if (isNaN(idInt)) {
    return res.status(404).json({ message: 'Not found' })
  }
  req.params.id = idInt
  next()
}