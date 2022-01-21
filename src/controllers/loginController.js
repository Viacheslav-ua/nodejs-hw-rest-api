import bcrypt from 'bcrypt'

import User from "../models/userModel"
import { HttpCode, Messages } from '../lib/constants'
import { generateTokens } from '../service/authService'
import resError from '../lib/responseError'

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email, verify: true })
    const validPassword = bcrypt.compareSync(password, user.password)
    
    if (!user || !validPassword) {
      return res.status(HttpCode.BAD_REQUEST).json(resError.unauthorized('Credentials incorrect'))
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