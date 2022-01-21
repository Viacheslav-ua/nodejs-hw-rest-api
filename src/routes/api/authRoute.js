import express from 'express'

import registration from '../../controllers/registrationController'
import login from '../../controllers/loginController'
import verifyEmail from '../../controllers/verifyController'
import sendEmailToken from '../../controllers/sendVerifyController'
import { logout } from '../../controllers/userController'
import { authValidation , emailValidation } from '../../middleware/authValidation'
import guard from '../../middleware/guard'

const router = express.Router()

router.post('/signup', authValidation, registration)

router.post('/login', authValidation, login)

router.post('/logout', guard, logout )

router.get('/verify/:verificationToken', verifyEmail)

router.post('/verify', emailValidation, sendEmailToken)

export default router
