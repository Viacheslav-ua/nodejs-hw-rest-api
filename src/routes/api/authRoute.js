import express from 'express'

import registration from '../../controllers/registrationController'
import login from '../../controllers/loginController'
import { logout } from '../../controllers/userController'
import { authValidation } from '../../middleware/authValidation'
import guard from '../../middleware/guard'

const router = express.Router()

router.post('/signup', authValidation, registration)

router.post('/login', authValidation, login)

router.post('/logout', guard, logout )

export default router
