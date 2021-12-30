import {
  getAllContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
  updateStatusContact,
} from '../service/contactsService'
import { HttpCode } from '../lib/constants'
import resError from '../lib/responseError'

const get = async (req, res, next) => {
  try {
    const contacts = await getAllContacts(req.query, req.user.id)
    res.status(HttpCode.OK).json({
      status: `${HttpCode.OK} OK`,
      ContentType: "application/json",
      ResponseBody: { ...contacts },
    });
  } catch (e) {
    console.error(e)
    next(e);
  }
}

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await getContactById(id, req.user.id)
    console.log(contact);
    if (contact) {
      return res.status(HttpCode.OK).json({
      status: `${HttpCode.OK} OK`,
      ContentType: "application/json",
      ResponseBody: { contact },
      });
    }
    res.status(HttpCode.NOT_FOUND).json(resError.notFound())

  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => { 
  try {
    const newContact = await createContact(req.body, req.user.id)
    res.status(HttpCode.CREATED).json({
      status: `${HttpCode.CREATED} Created`,
      ContentType: "application/json",
      ResponseBody: { newContact },
      })
  } catch (e) {
    console.error(e);
    next(e);
  }
}

const remove = async (req, res, next) => { 
  const { id } = req.params;
  const contact = await removeContact(id, req.user.id)
  if (contact) {
    return res.status(HttpCode.OK).json({
      status: `${HttpCode.OK} OK`,
      ContentType: "application/json",
      ResponseBody: { contact },
      })
  }
  res.status(HttpCode.NOT_FOUND).json(resError.notFound())
}

const update = async (req, res, next) => { 

  const contact = await updateContact(req.params.id, req.body, req.user.id)
  if (contact) {
    return res.status(HttpCode.OK).json({
      status: `${HttpCode.OK} OK`,
      ContentType: "application/json",
      ResponseBody: { contact },
      })
  }
  res.status(HttpCode.NOT_FOUND).json(resError.notFound())
}

const updateStatus = async (req, res, next) => {

  const contact = await updateStatusContact(req.params.id, { favorite: req.body.favorite }, req.user.id)
  if (contact) {
    return res.status(HttpCode.OK).json({
      status: `${HttpCode.OK} OK`,
      ContentType: "application/json",
      ResponseBody: { contact },
      })
  }
  res.status(HttpCode.NOT_FOUND).json(resError.notFound())
}

export default {
  get,
  getById,
  create,
  remove,
  update,
  updateStatus,
}