import jwt from 'jsonwebtoken'
import User from "../models/userModel"

export const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '8h' })
  return accessToken
}

export const validateToken = async (token) => {
  try {
    const userData = jwt.verify(token, process.env.ACCESS_SECRET)
    const user = await User.findOne({ _id: userData.id })
    if (!user || user.token !== token) {
      return null
    }
    return user
  } catch (e) {
    return null
  }
}