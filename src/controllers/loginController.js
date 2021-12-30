import bcrypt from 'bcrypt'

import User from "../models/userModel"
import { HttpCode, Messages } from '../lib/constants'
import { generateTokens } from '../service/tokenService'
import resError from '../lib/responseError'

const login = async (req, res, nex) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    const validPassword = bcrypt.compareSync(password, user.password)
    
    if (!user) {
      return res.code(HttpCode.BAD_REQUEST).json(resError.badRequest(Messages.NOT_FOUND_EMAIL))
    }
    if (!validPassword) {
      return res.status(HttpCode.BAD_REQUEST).json(resError.unauthorized(Messages.PASSWORD_ERROR))
    }

    const payload = { id: user.id, email: user.email, subscription: user.subscription }
    const token = generateTokens(payload)
    user.token = token
    await user.save()
    
    res.json({
      status: `${HttpCode.OK} OK`,
      ContentType: 'application/json',
      ResponseBody: {
        token: user.token,
        user: {
          email: user.email,
          subscription: user.subscription,
        }
      }
    })
  } catch (e) {
    console.log(e)
    res.status(HttpCode.BAD_REQUEST).json(resError.badRequest(Messages.LOGIN_ERROR))
  }

}

export default login