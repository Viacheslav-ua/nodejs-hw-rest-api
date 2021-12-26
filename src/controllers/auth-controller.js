import {serviceRegistration, serviceLogin} from '../service/auth-service'

const registration = async (req, res, nex) => {
  const {email, password} = req.body
  const result = await serviceRegistration(email, password)
  console.log(result)
}

const login = async (req, res, nex) => {
await serviceLogin()
}

export default {
  registration,
  login,
}