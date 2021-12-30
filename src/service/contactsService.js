import Contact from "../models/contactModel";

export const getAllContacts = async ({
  sortBy,
  sortByDesc,
  filter,
  favorite,
  page = 1,
  limit = 20,
}, UserId) => {
  let skip = 0
  if (page >= 1) {
    skip = (parseInt(page) - 1)*parseInt(limit)
  }
  let sortCriteria = null
  const total = await Contact.find({ owner: UserId }).countDocuments()
  let query
  console.log("sfdg", favorite)
  if (favorite) {
    query = Contact.find({ owner: UserId, favorite: favorite })
  } else {
    query = Contact.find({ owner: UserId})
  }
  // const query = Contact.find({ owner: UserId})
  
  
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
 

export const getContactById = async (id, UserId) => {
  return await Contact.findOne({ _id: id, owner: UserId})
}

export const createContact = async (data, userId) => {
  return await Contact.create({ ...data, owner: userId })
}

export const removeContact = async (id, UserId) => {
  return await Contact.findOneAndRemove({ _id: id, owner: UserId })
}

export const updateContact = async (id, data, UserId) => {
  return await Contact.findOneAndUpdate({ _id: id, owner: UserId }, data, { new: true })
};

export const updateStatusContact = async (id, data, UserId) => {
  return await Contact.findOneAndUpdate({ _id: id, owner: UserId }, {favorite: data.favorite}, { new: true })
}