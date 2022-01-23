import User from "../models/userModel"
import { HttpCode } from '../lib/constants'
import resError from '../lib/responseError'
import sendVerify from '../lib/sendVerify'

const sendEmailToken = async (req, res, next) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(HttpCode.BAD_REQUEST).json(resError.badRequest('Missing required field email'))
    if (user.verify) {
      return res.status(HttpCode.BAD_REQUEST).json(resError.badRequest('Verification has already been passed'))
    }
        
    const sending = await sendVerify(req, user.verificationToken)
    if (sending) {
      console.log('Email sent')
      res.status(HttpCode.OK).json({
        Status: '200 OK',
        ContentType: 'application/json',
        ResponseBody: {
        message: 'Verification email sent',
        },
      })
    }
    
  } catch (e) {
    res.status(HttpCode.BAD_REQUEST).json(resError.badRequest('missing required field email'))
    next(e);  
  }
}

export default sendEmailToken