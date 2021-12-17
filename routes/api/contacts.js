import express from 'express'
import { postValidation, patchValidation, intId } from '../../middlware/contacts.js'
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
router.get('/:contactId', intId, async (req, res) => {
  const { contactId } = req.params
  const result = await getContactById(contactId)
  if (result) {
    res.json(result)
  } else {
    res.status(404).json({ message: 'Not found' })
  }
})

/**
 * Add contact
*/
router.post('/', postValidation, async (req, res) => {
  const contact = { id: Date.now(), ...req.body }
  const result = await addContact(contact)
  res.status(201).json(result)
})

/**
 * Delete contact
 */
router.delete('/:contactId', intId, async (req, res) => {
  const { contactId } = req.params
  const result = await removeContact(contactId)
  if (result) {
    res.status(200).json({ message: 'contact deleted' })
  } else {
    res.status(404).json({ message: 'Not found' })
  }
})

router.patch('/:contactId', patchValidation, intId, async (req, res) => {
  const { contactId } = req.params
  const { name, email, phone } = req.body
  if (name || email || phone) {
    const result = await updateContact(contactId, req.body)
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
