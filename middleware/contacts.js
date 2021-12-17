import Joi from 'joi'

export const postValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).trim().required(),
    email: Joi.string().min(4).max(255).trim().email().required(),
    phone: Joi.string().min(2).max(20).trim().required(),
  })
  const validation = schema.validate(req.body)
  if (validation.error) {
    console.log(validation.error.details[0].message)
    return res.status(400).json({ message: validation.error.details[0].message })
  }
  next()
}

export const patchValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).trim(),
    email: Joi.string().min(4).max(255).trim().email(),
    phone: Joi.string().min(2).max(20).trim(),
  })
  const validation = schema.validate(req.body)
  if (validation.error) {
    console.log(validation.error.details[0].message)
    return res.status(400).json({ message: validation.error.details[0].message })
  }
  next()
}

export const intId = (req, res, next) => {
  const { contactId } = req.params
  const idInt = parseInt(contactId)
  if (isNaN(idInt)) {
    return res.status(404).json({ message: 'Not found' })
  }
  req.params.contactId = idInt
  next()
}
