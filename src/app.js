import express from 'express'
import logger from 'morgan'
import cors from 'cors'

import authRouter from './routes/api/authRoute'
import usersRouter from './routes/api/usersRoute'
import contactsRouter from './routes/api/contactsRoute'
import { HttpCode, Messages } from './lib/constants'
import guard from './middleware/guard'
import resError from './lib/responseError'

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/users', authRouter)
app.use('/api/users', guard, usersRouter)
app.use('/api/contacts', guard, contactsRouter)

app.use(express.static(process.env.STATIC_DIR))

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json(resError.notFound())
})

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    status: 'fail',
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: err.message,
    data: Messages.INTERNAL_SERVER_ERROR,
  });
})

export default app
