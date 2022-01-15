import bcrypt from 'bcrypt'
import gravatar from 'gravatar'

import User from "../models/userModel"
import { HttpCode, Messages } from '../lib/constants'
import resError from '../lib/responseError'

const registration = async (req, res, next) => {
  const { email, password } = req.body
  
  const user = await User.findOne({ email })
  if (user) {
    return res.status(HttpCode.CONFLICT).json(resError.conflict())
  }
  try {
    const hashPassword = await bcrypt.hash(password, 8)
    const avatarURL = gravatar.url(email, {s: '250'}, true);
    const newUser = new User({ email, password: hashPassword, avatarURL: avatarURL })
    await newUser.save()
    
    res.status(HttpCode.CREATED).json({
      status: `${HttpCode.CREATED} Created`,
      ContentType: 'application/json',
      ResponseBody: {
        message: Messages.REGISTRATION_SUCCESSFUL,
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
        }
      }
  })
  } catch (e) {
    res.status(HttpCode.BAD_REQUEST).json(resError.badRequest(Messages.REGISTRATION_ERROR))
    next(e);
  }
}

export default registration
 