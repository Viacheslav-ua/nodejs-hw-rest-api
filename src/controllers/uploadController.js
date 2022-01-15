import { HttpCode } from '../lib/constants'
import { handleAvatar } from '../service/uploadService';
import resError from "../lib/responseError"

export const uploadAvatar = async (req, res, next) => {
  try {
    const avatarURL = await handleAvatar(req.user.id, req.file.filename, req.file.path)
    if (avatarURL) {
      return res.status(HttpCode.OK).json({
        status: `${HttpCode.OK} OK`,
        ContentType: "application/json",
        ResponseBody: {
          avatarURL: avatarURL
        },
      })
    }
    res.status(HttpCode.UNAUTHORIZED).json(resError.unauthorized())
  } catch (e) {
    console.error(e)
    next(e);
  }
}