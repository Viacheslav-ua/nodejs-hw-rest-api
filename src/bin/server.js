import db from '../db/db'
import app from '../app.js'

const PORT = process.env.PORT ?? 3000

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((err) => {
  console.log(`Server not running. Error: ${err.message}`)
})
