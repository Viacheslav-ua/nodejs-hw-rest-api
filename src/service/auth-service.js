import bcrypt from 'bcrypt'
import User from "../models/user-model"

export const serviceRegistration = async (email, password) => {
  console.log(password)
  
  const user = new User({ email, password: await bcrypt.hash(password, 10) })
  
  await user.save()
}

export const serviceLogin = () => {

}
