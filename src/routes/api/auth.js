import express from 'express'
// import { postValidation, patchValidation, idValidation } from '../../middleware/contacts-validation.js'
 import authCtrl from '../../controllers/auth-controller'

const router = express.Router()

router.post('/signup', authCtrl.registration)

// router.post('/login')

// router.post('/logout')

// router.post('/current')



export default router
