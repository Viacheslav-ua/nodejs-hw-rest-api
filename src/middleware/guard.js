import { HttpCode } from "../lib/constants"
import resError from '../lib/responseError'
import { validateToken } from "../service/authService"

const guard = async (req, res, next) => {
  try {
    const authorizationHeader = req.get('authorization')
    if (!authorizationHeader) {
      return res.status(HttpCode.UNAUTHORIZED).json(resError.unauthorized())
    }
    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) {
      return res.status(HttpCode.UNAUTHORIZED).json(resError.unauthorized())
    }
    const userData = await validateToken(accessToken)
    if (!userData) {
      return res.status(HttpCode.UNAUTHORIZED).json(resError.unauthorized())
    }
    
    req.user = userData
    next()

  } catch (e) {
    return res.status(HttpCode.UNAUTHORIZED).json(resError.unauthorized())
  }
}
export default guard