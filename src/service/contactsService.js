import Contact from "../models/contactModel";

export const getAllContacts = async ({
  sortBy,
  sortByDesc,
  filter,
  favorite,
  page = 1,
  limit = 20,
}, userId) => {
  let skip = 0
  if (page >= 1) {
    skip = (parseInt(page) - 1)*parseInt(limit)
  }
  
  const total = await Contact.find({ owner: userId }).countDocuments()
  let query
  if (favorite) {
    query = Contact.find({ owner: userId, favorite: favorite })
  } else {
    query = Contact.find({ owner: userId})
  }

  let sortCriteria = null
  if (sortBy) {
    sortCriteria = {[`${sortBy}`]: 1}
  }
  if (sortByDesc) {
    sortCriteria = {[`${sortByDesc}`]: -1}
  }
  if (filter) {
    query.select(filter.split('|').join(' '))
  }
  const result = await query.limit(parseInt(limit)).skip(skip).sort(sortCriteria)
  return { total, contacts: result }
}
 

export const getContactById = async (id, userId) => {
  return await Contact.findOne({ _id: id, owner: userId})
}

export const createContact = async (data, userId) => {
  return await Contact.create({ ...data, owner: userId })
}

export const removeContact = async (id, userId) => {
  return await Contact.findOneAndRemove({ _id: id, owner: userId })
}

export const updateContact = async (id, data, userId) => {
  return await Contact.findOneAndUpdate({ _id: id, owner: userId }, data, { new: true })
};

export const updateStatusContact = async (id, data, userId) => {
  return await Contact.findOneAndUpdate({ _id: id, owner: userId }, {favorite: data.favorite}, { new: true })
}