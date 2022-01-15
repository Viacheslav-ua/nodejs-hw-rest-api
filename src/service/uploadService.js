import Jimp from 'jimp'
import path from 'path'
import fs from 'fs/promises'

import User from '../models/userModel'
 
export const handleAvatar = async (userId, fileName, filePath) => {
  const img = await Jimp.read(filePath)
  await img
  .autocrop()
  .cover(250, 250, Jimp.HORIZONTAL_ALIGN_LEFT | Jimp.VERTICAL_ALIGN_TOP)
  .writeAsync(filePath)

  const AVATARS_FOLDER = 'avatars'
  const destination = path.join(process.env.STATIC_DIR, AVATARS_FOLDER, userId)
  
  await fs.mkdir(destination, {recursive: true})
  await fs.rename(filePath, path.join(destination, fileName))

  const avatarURL = path.normalize(path.join(userId, fileName))
  await User.findOneAndUpdate({ _id: userId }, { avatarURL: avatarURL }, { new: true })
  return avatarURL
}