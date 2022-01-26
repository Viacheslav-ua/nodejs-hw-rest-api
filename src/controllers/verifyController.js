import User from "../models/userModel"
import { HttpCode } from '../lib/constants'
import resError from "../lib/responseError"

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params
  try {
  const user = await User.findOne({ verificationToken }) 
    if (user) {
      user.verificationToken = null
      user.verify = true
      await user.save()
      return res.status(HttpCode.OK).json({
        ResponseBody: {
          message: 'Verification successful',
        }
      })
    }
    res.status(HttpCode.NOT_FOUND).json(resError.notFound('User not found'))

  } catch (e) {
    console.log(e)
    res.status(HttpCode.BAD_REQUEST).json(resError.badRequest(e.message))
  }
}

export default verifyEmail