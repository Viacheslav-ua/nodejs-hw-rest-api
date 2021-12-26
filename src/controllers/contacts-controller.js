import {
  getAllContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
  updateStatusContact,
} from '../service/contacts-service'
import {HttpCode, Messages} from '../lib/constans'

const get = async (req, res, next) => {
  try {
    const contacts = await getAllContacts(req.query)
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { ...contacts },
    });
  } catch (e) {
    console.error(e)
    next(e);
  }
}

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await getContactById(id)
    console.log(contact);
    if (contact) {
      return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact },
      });
    }
    res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: Messages.NOT_FOUND, 
    })

  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => { 
  try {
    const newContact = await createContact(req.body)
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {newContact },
      })
  } catch (e) {
    console.error(e);
    next(e);
  }
}

const remove = async (req, res, next) => { 
  const { id } = req.params;
  const contact = await removeContact(id)
  if (contact) {
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact },
      })
  }
  res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: Messages.NOT_FOUND, 
    })
}

const update = async (req, res, next) => { 

  const contact = await updateContact(req.params.id, req.body)
  if (contact) {
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact },
      })
  }
  res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: Messages.NOT_FOUND, 
    })
}

const updateStatus = async (req, res, next) => {

  const contact = await updateStatusContact(req.params.id, { favorite: req.body.favorite })
  if (contact) {
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact },
      })
  }
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: Messages.NOT_FOUND,
  })
}

export default {
  get,
  getById,
  create,
  remove,
  update,
  updateStatus,
}