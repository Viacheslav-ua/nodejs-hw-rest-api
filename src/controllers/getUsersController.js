import User from "../models/userModel"
// import { HttpCode, Messages } from '../lib/constance'

const getUsers = async (req, res, nex) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (e) {
    console.log(e)
  }
}

export default getUsers