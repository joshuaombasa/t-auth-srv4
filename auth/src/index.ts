import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middleware/error-handler'
const PORT = 3000

const app = express()

app.use(express.json())

app.set('truest proxy', true)

app.use(cookieSession({
  signed: false,
  secure: false
}))

app.use(signupRouter)

app.all('*', () => {
  
})

app.use(errorHandler)


const start  = async() => {
  await mongoose.connect('mongodb://127.0.0.1:27017/tiketi6-auth?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1')

  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
  })
}

start()