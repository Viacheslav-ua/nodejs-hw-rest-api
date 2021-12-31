import express from 'express'

import registration from '../../controllers/registrationController'
import login from '../../controllers/loginController'
import { logout, current, updateSubscription } from '../../controllers/userController'
import getUsers from '../../controllers/getUsersController'
import { authValidation, subscriptionValidation } from '../../middleware/authValidation'
import guard from '../../middleware/guard'

const router = express.Router()

router.post('/signup', authValidation, registration)

router.post('/login', authValidation, login)

router.get('/list', guard, getUsers)

router.post('/logout', guard, logout )

router.get('/current', guard, current)

router.patch('/', guard, subscriptionValidation, updateSubscription)

export default router
