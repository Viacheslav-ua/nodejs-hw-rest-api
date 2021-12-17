import fs from 'fs/promises'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

// const __dirname = path.resolve()
const __dirname = dirname(fileURLToPath(import.meta.url))
const contactsPath = path.join(__dirname, 'contacts.json')

export const listContacts = async () => {
  try {
    const content = await fs.readFile(contactsPath, 'utf8')
    return JSON.parse(content)
  } catch (error) {
    console.log(error)
  }
}

export const getContactById = async (id) => {
  const data = await listContacts()
  return data.find((item) => item.id === id)
}

export const removeContact = async (id) => {
  const data = await listContacts()
  if (!data.some((contact) => contact.id === id)) {
    return false
  }
  const result = data.filter((item) => item.id !== id)

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

export const updateContact = async (id, body) => {
  const data = await listContacts()
  if (!data.some((contact) => contact.id === id)) {
    return false
  }
  const { name, email, phone } = body
  const result = data.map((item) => {
    if (item.id === id) {
      return {
        id: id,
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
    return result.find((item) => item.id === id)
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
