import sgMail from '@sendgrid/mail'

import User from "../models/userModel"
import { HttpCode } from '../lib/constants'
import resError from '../lib/responseError'

const sendEmailToken = async (req, res, next) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(HttpCode.BAD_REQUEST).json(resError.badRequest('Missing required field email'))
    if (user.verify) {
      return res.status(HttpCode.BAD_REQUEST).json(resError.badRequest('Verification has already been passed'))
    }
    const msg = {
      to: email,
      from: process.env.SENDER_SENDGRID,
      subject: "E-mail confirmation",
      text: `Go to the confirmation link ${req.protocol}://${req.get('host')}/api/users/verify/${user.verificationToken}`,
      html: `<strong>Go to the confirmation link <a href="${req.protocol}://${req.get('host')}/api/users/verify/${user.verificationToken}">CONFIRM</a> </strong>`,
    }
    
    const sending = await sgMail.send(msg)
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