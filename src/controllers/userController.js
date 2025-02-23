import User from "../models/userModel"
import { HttpCode } from '../lib/constants'
import resError from "../lib/responseError"

export const logout = async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.user.id }, { token: '' }, { new: true })
  if (!user) {
    return res.status(HttpCode.UNAUTHORIZED).json(resError.unauthorized())
  }
  return res.status(HttpCode.NO_CONTENT).json({
    Status: `${HttpCode.NO_CONTENT} No Content`, 
  })
}

export const current = async (req, res) => {
  return res.status(HttpCode.OK).json({
      status: `${HttpCode.OK} OK`,
      ContentType: 'application/json',
      ResponseBody: {
        email: req.user.email,
        subscription: req.user.subscription,
      }
    })
}

export const updateSubscription = async(req, res) => {
  const { subscription } = req.body
  const user = await User.findOneAndUpdate(
    { _id: req.user.id }, { subscription: subscription }, { new: true }
  )
  if (user) {
    return res.status(HttpCode.OK).json({
      status: `${HttpCode.OK} OK`,
      ContentType: "application/json",
      ResponseBody: { user },
      })
  }
  res.status(HttpCode.NOT_FOUND).json(resError.notFound()) 
}