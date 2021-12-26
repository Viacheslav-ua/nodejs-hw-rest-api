import Contact from "../models/contact-model";

export const getAllContacts = async ({
  sortBy,
  sortByDesc,
  filter,
  limit = 50,
  skip = 0,
}) => {
  let sortCriteria = null
  const total = await Contact.find().countDocuments()
  const query  = Contact.find()
  if (sortBy) {
    sortCriteria = {[`${sortBy}`]: 1}
  }
  if (sortByDesc) {
    sortCriteria = {[`${sortByDesc}`]: -1}
  }
  if (filter) {
    query.select(filter.split('|').join(' '))
  }
  const result = await query.limit(parseInt(limit)).skip(parseInt(skip)).sort(sortCriteria)
  return { total, contacts: result }
}
 

export const getContactById = async (id) => {
  return await Contact.findOne({ _id: id })
}

export const createContact = async (data) => {
  return await Contact.create(data)
}

export const removeContact = async (id) => {
  return await Contact.findByIdAndRemove({ _id: id })
}

export const updateContact = async (id, data) => {
  return await Contact.findByIdAndUpdate({ _id: id }, data, { new: true })
};

export const updateStatusContact = async (id, data) => {
  return await Contact.findByIdAndUpdate({ _id: id }, {favorite: data.favorite}, { new: true })
}