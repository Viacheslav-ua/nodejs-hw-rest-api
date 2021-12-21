import { } from 'dotenv/config'
import mongoose from 'mongoose'
import app from '../app.js'

const PORT = process.env.PORT ?? 3000
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb)

connection
  .then(() => {
    console.log('Database connection successful')
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch(err => {
    console.log(`Server not running. Error message: ${err.message}`)
    process.exit(1)
  })
