import {HttpCode, Messages} from './constants'

const notFound = (message = Messages.NOT_FOUND) => {
  return {
      status: `${HttpCode.NOT_FOUND} ${Messages.NOT_FOUND}`,
      ContentType: 'application/json',
      ResponseBody: {
        message,
      }
    }
}

const badRequest = (message = Messages.BAD_REQUEST) => {
  return {
    status: `${HttpCode.BAD_REQUEST} ${Messages.BAD_REQUEST}`,
    ContentType: 'application/json',
    ResponseBody: {
      message,
    }
  }
}

const conflict = (message = Messages.CONFLICT_EMAIL) => {
  return {
      status: `${HttpCode.CONFLICT} Conflict`,
      ContentType: 'application/json',
      ResponseBody: {
          message,
        }
      }
}

const unauthorized = (message = Messages.UNAUTHORIZED) => {
  return {
    status: `${HttpCode.UNAUTHORIZED} Unauthorized`,
    ContentType: 'application/json',
    ResponseBody: {
      message,
    }
  }
}

export default {
  unauthorized,
  notFound,
  badRequest,
  conflict,
}