const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  try {
    const content = await fs.readFile(contactsPath, 'utf8')
    return JSON.parse(content)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

const getContactById = async (contactId) => {
  const data = await listContacts()
  return data.find((item) => item.id === contactId)
}

const removeContact = async (contactId) => {
  const data = await listContacts()
  let isFound = false
  const result = data.filter((item) => {
    if (item.id === contactId) {
      isFound = true
      return false
    }
    return true
  })
  if (!isFound) {
    return false
  }

  try {
    await fs.writeFile(contactsPath, JSON.stringify(result, null, 2))
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const addContact = async (contact) => {
  const data = await listContacts()
  data.push(contact)
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2))
    return contact
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

const updateContact = async (contactId, body) => {
  const data = await listContacts()
  const { name, email, phone } = body
  let isFound = false
  const result = data.map((item) => {
    if (item.id === contactId) {
      isFound = true
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
  if (isFound) {
    try {
      await fs.writeFile(contactsPath, JSON.stringify(result, null, 2))
      return result.find((item) => item.id === contactId)
    } catch (error) {
      console.log(error)
      return false
    }
  }
  return false
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
