import express from 'express'
import { postValidation, patchValidation, intId } from '../../middleware/contacts.js'
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from '../../model/index'

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
router.get('/:id', intId, async (req, res) => {
  const { id } = req.params
  const result = await getContactById(id)
  if (result) {
   return res.status(200).json(result)
  }
  res.status(404).json({ message: 'Not found' })
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
router.delete('/:id', intId, async (req, res) => {
  const { id } = req.params
  const result = await removeContact(id)
  if (result) {
    return res.status(200).json({ message: 'contact deleted' })
  }
    res.status(404).json({ message: 'Not found' })
})

/**
 * Edit contact
 */
router.patch('/:id', patchValidation, intId, async (req, res) => {
  const { id } = req.params
  const result = await updateContact(id, req.body)
  if (result) {
    return res.status(200).json(result)
  }
    res.status(404).json({ message: 'Not found' })
})

export default router
