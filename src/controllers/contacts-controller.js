import Contact from "../models/contacts-model"

const get = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.status(200).json(result);
  } catch (e) {
    console.error(e)
    next(e);
  }
}

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Contact.findOne({ _id: id })
    if (result) {
      res.status(200).json(result)
    }
    res.status(404).json({ message: 'Not found' })

  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => { 
  try {
    const result = await Contact.create(req.body)
    res.status(201).json(result)
  } catch (e) {
    console.error(e);
    next(e);
  }
}

const remove = async (req, res, next) => { 
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove({ _id: id })
  if (result) {
    return res.status(200).json({ message: result })
  }
  res.status(404).json({ message: 'Not found' })
}

const update = async (req, res, next) => { 

  const result = await Contact.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
  if (result) {
    return res.status(200).json({ message: result })
  }
  res.status(404).json({ message: 'Not found' })
}

const updateStatus = async (req, res, next) => { 

  const result = await Contact.findByIdAndUpdate({ _id: req.params.id }, {favorite: req.body.favorite}, { new: true })
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