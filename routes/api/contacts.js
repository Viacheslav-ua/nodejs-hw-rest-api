const express = require('express')
const Joi = require('joi')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index')

const router = express.Router()

/**
 * Response all contacts
 */
router.get('/', async (req, res, next) => {
  const data = await listContacts()
  res.json(data)
  // next()
})

/**
 * Response one contact
 */
router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const idInt = parseInt(contactId)
  if (isNaN(idInt)) {
    res.status(404)
    res.json({ message: 'Not found' })
    return
  }
  const result = await getContactById(idInt)
  if (result) {
    res.json(result)
  } else {
    res.status(404)
    res.json({ message: 'Not found' })
  }
})

/**
 * Add contact
 */
router.post('/', async (req, res, next) => {
  const resultValidate = Joi.object().keys({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    phone: Joi.string().trim().required(),
  }).validate(req.body)

  if (resultValidate.error) {
    console.log(resultValidate.error)
    res.status(400)
    return res.json({ message: 'missing required name field' })
  }
  const contact = { id: Date.now(), ...resultValidate.value }
  const result = await addContact(contact)
  res.status(201)
  res.json(result)
})

/**
 * Delete contact
 */
router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const idInt = parseInt(contactId)
  if (isNaN(idInt)) {
    res.status(404)
    res.json({ message: 'Not found' })
    return
  }
  const result = await removeContact(idInt)
  if (result) {
    res.status(200)
    res.json({ message: 'contact deleted' })
  } else {
    res.status(404)
    res.json({ message: 'Not found' })
  }
})

router.patch('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const idInt = parseInt(contactId)
  if (isNaN(idInt)) {
    res.status(404)
    res.json({ message: 'Not found' })
    return
  }
  const resultValidate = Joi.object().keys({
    name: Joi.string().trim(),
    email: Joi.string().trim().email(),
    phone: Joi.string().trim(),
  }).validate(req.body)
  if (resultValidate.error) {
    console.log(resultValidate.error)
    res.status(400)
    return res.json({ message: 'missing required field' })
  }
  const { name, email, phone } = req.body
  if (name || email || phone) {
    const result = await updateContact(idInt, resultValidate.value)
    if (result) {
      res.status(200)
      res.json(result)
    } else {
      res.status(404)
      res.json({ message: 'Not found' })
    }
  } else {
    res.status(400)
    res.json({ message: 'missing fields' })
  }
})

module.exports = router
