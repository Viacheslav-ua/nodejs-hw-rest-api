import express from 'express'
import logger from 'morgan'
import cors from 'cors'

import authRouter from './routes/api/auth'
import contactsRouter from './routes/api/contacts'
import { HttpCode, Messages } from './lib/constans'

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/users', authRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: 'Use api on routes: /api/contacts',
    data: Messages.NOT_FOUND,
  });
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
