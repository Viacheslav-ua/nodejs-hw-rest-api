import bcrypt from 'bcrypt'
import gravatar from 'gravatar'
import { v4 as uuidv4 } from 'uuid';
import sgMail from '@sendgrid/mail'

import User from "../models/userModel"
import { HttpCode, Messages } from '../lib/constants'
import resError from '../lib/responseError'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const registration = async (req, res, next) => {
  const { email, password } = req.body
    
  const user = await User.findOne({ email })
  if (user) {
    return res.status(HttpCode.CONFLICT).json(resError.conflict())
  }
  try {
    const hashPassword = await bcrypt.hash(password, 8)
    const avatarURL = gravatar.url(email, {s: '250'}, true);
    const verificationToken = uuidv4()
    const newUser = new User({ email, password: hashPassword, verificationToken, avatarURL })
    await newUser.save()

    const msg = {
      to: email,
      from: process.env.SENDER_SENDGRID,
      subject: "E-mail confirmation",
      text: `Go to the confirmation link ${req.protocol}://${req.get('host')}/api/users/verify/${verificationToken}`,
      html: `<strong>Go to the confirmation link <a href="${req.protocol}://${req.get('host')}/api/users/verify/${verificationToken}">CONFIRM</a> </strong>`,
    }
    await sgMail.send(msg).then(() => console.log('Email sent'))
 
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
 