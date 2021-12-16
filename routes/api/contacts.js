import express from 'express'
import { postValidation, patchValidation } from '../../validations/contacts.js'
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from '../../model/index.js'

const router = express.Router()

/**
 * Response all contacts
 */
router.get('/', async (_req, res) => {
  const data = await listContacts()
  res.json(data)
})

/**
 * Response one contact
 */
router.get('/:contactId', async (req, res) => {
  const { contactId } = req.params
  const idInt = parseInt(contactId)
  if (isNaN(idInt)) {
    return res.status(404).json({ message: 'Not found' })
  }
  const result = await getContactById(idInt)
  if (result) {
    res.json(result)
  } else {
    res.status(404).json({ message: 'Not found' })
  }
})

/**
 * Add contact
*/
router.post('/', async (req, res) => {
  const { error } = postValidation(req.body)
  if (error) {
    console.log(error.details[0].message)
    return res.status(400).json({ message: error.details[0].message })
  }
  const contact = { id: Date.now(), ...req.body }
  const result = await addContact(contact)
  res.status(201).json(result)
})

/**
 * Delete contact
 */
router.delete('/:contactId', async (req, res) => {
  const { contactId } = req.params
  const idInt = parseInt(contactId)
  if (isNaN(idInt)) {
    return res.status(404).json({ message: 'Not found' })
  }
  const result = await removeContact(idInt)
  if (result) {
    res.status(200).json({ message: 'contact deleted' })
  } else {
    res.status(404).json({ message: 'Not found' })
  }
})

router.patch('/:contactId', async (req, res) => {
  const { contactId } = req.params
  const idInt = parseInt(contactId)
  if (isNaN(idInt)) {
    return res.status(404).json({ message: 'Not found' })
  }

  const { error } = patchValidation(req.body)
  if (error) {
    console.log(error.details[0].message)
    return res.status(400).json({ message: error.details[0].message })
  }

  const { name, email, phone } = req.body
  if (name || email || phone) {
    const result = await updateContact(idInt, req.body)
    if (result) {
      res.status(200).json(result)
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } else {
    res.status(400).json({ message: 'missing fields' })
  }
})

export default router
