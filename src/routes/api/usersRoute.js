import express from 'express'

import { current, updateSubscription } from '../../controllers/userController'
import { uploadAvatar } from '../../controllers/uploadController'
import { subscriptionValidation } from '../../middleware/authValidation'
import { upload } from '../../middleware/uploadFiles'

const router = express.Router()

router.get('/current', current)

router.patch('/', subscriptionValidation, updateSubscription)

router.patch('/avatar', upload.single('avatar'), uploadAvatar)

export default router