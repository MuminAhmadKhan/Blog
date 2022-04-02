const express = require('express')
const { PORT, MONGODB_URI} = require('./utils/config')
const http = require('http')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { log_info,log_error } = require('./utils/loggers')
const blogsRouter = require('./controllers/blogs')
const userRouter  = require('./controllers/users')
const  middleware = require('./utils/middelware')
const loginRouter = require('./controllers/login')

mongoose.connect(MONGODB_URI)
app.use(middleware.tokenExtractor)

app.use(cors())
app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users',userRouter)
app.use(middleware.requestLogger)
 
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
  }

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app