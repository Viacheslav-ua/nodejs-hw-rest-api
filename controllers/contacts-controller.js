import {
  getAllContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
  updateStatusContact,
} from "../service";

const get = async (req, res, next) => {
  try {
    const result = await getAllContacts();
    res.status(200).json(result);
  } catch (e) {
    console.error(e)
    next(e);
  }
}

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await getContactById(id);
    if (result) {
      res.status(200).json(result);
    }
    res.status(404).json({ message: 'Not found' })

  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => { 
  try {
    const result = await createContact(req.body)
    res.status(201).json(result)
  } catch (e) {
    console.error(e);
    next(e);
  }
}

const remove = async (req, res, next) => { 
  const { id } = req.params;
  const result = await removeContact(id)
  if (result) {
    return res.status(200).json({ message: result })
  }
  res.status(404).json({ message: 'Not found' })
}

const update = async (req, res, next) => { 

  const result = await updateContact(req.params.id, req.body)
  if (result) {
    return res.status(200).json({ message: result })
  }
  res.status(404).json({ message: 'Not found' })
}

const updateStatus = async (req, res, next) => { 

  const result = await updateStatusContact(req.params.id, req.body)
  if (result) {
    return res.status(200).json({ message: result })
  }
  res.status(404).json({ message: 'Not found' })
}


export default {
  get,
  getById,
  create,
  remove,
  update,
  updateStatus,
}