import express from 'express'
import { postValidation, patchValidation, idValidation } from '../../middleware/contacts-validation.js'
import contactsCtrl from '../../controllers/contacts-controller'

const router = express.Router()

router.get('/', contactsCtrl.get)

router.get('/:id', idValidation, contactsCtrl.getById)

router.post('/', postValidation, contactsCtrl.create)

router.delete('/:id', idValidation, contactsCtrl.remove)

router.patch('/:id/favorite', idValidation, patchValidation, contactsCtrl.updateStatus)

router.patch('/:id', idValidation, patchValidation, contactsCtrl.update)

export default router
