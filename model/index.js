import fs from 'fs/promises'
import path from 'path'

const __dirname = path.resolve()
const contactsPath = path.join(__dirname, 'model/contacts.json')

export const listContacts = async () => {
  try {
    const content = await fs.readFile(contactsPath, 'utf8')
    return JSON.parse(content)
  } catch (error) {
    console.log(error)
  }
}

export const getContactById = async (contactId) => {
  const data = await listContacts()
  return data.find((item) => item.id === contactId)
}

export const removeContact = async (contactId) => {
  const data = await listContacts()
  if (!data.some((contact) => contact.id === contactId)) {
    return false
  }
  const result = data.filter((item) => item.id !== contactId)

  try {
    await fs.writeFile(contactsPath, JSON.stringify(result, null, 2))
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const addContact = async (contact) => {
  const data = await listContacts()
  data.push(contact)
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2))
    return contact
  } catch (error) {
    console.log(error)
  }
}

export const updateContact = async (contactId, body) => {
  const data = await listContacts()
  if (!data.some((contact) => contact.id === contactId)) {
    return false
  }
  const { name, email, phone } = body
  const result = data.map((item) => {
    if (item.id === contactId) {
      return {
        id: contactId,
        name: name || item.name,
        email: email || item.email,
        phone: phone || item.phone,
      }
    } else {
      return item
    }
  })
  try {
    await fs.writeFile(contactsPath, JSON.stringify(result, null, 2))
    return result.find((item) => item.id === contactId)
  } catch (error) {
    console.log(error)
    return false
  }
}

// export default {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
