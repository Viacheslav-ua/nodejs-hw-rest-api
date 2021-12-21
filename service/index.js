import Contact from "./schemas/contacts-schema";

export const getAllContacts = () => {
  return Contact.find()
}

export const getContactById = id => {
  return Contact.findOne({ _id: id })
}

export const createContact = data => {
  return Contact.create(data)
}

export const removeContact = id => {
  return Contact.findByIdAndRemove({ _id: id })
}

export const updateContact = (id, data) => {
  return Contact.findByIdAndUpdate({ _id: id }, data, { new: true })
};

export const updateStatusContact = (id, data) => {
  return Contact.findByIdAndUpdate({ _id: id }, {favorite: data.favorite}, { new: true })
}