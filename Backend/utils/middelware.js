const jwt = require('jsonwebtoken')
const {log_info,log_error} = require('./loggers')

const requestLogger = (request, response, next) => {
    log_info('Method:', request.method)
    log_info('Path:  ', request.path)
    log_info('Body:  ', request.body)
    log_info('---')
    next()
  }
  
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  const errorHandler = (error, request, response, next) => {
    log_error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }
  const tokenExtractor = (request, response, next) =>{
  
    const authorization = request.get('authorization')
    console.log(authorization)
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
    }
    else request.token =  null
    next()
  }
  const userExtractor = (request, response, next) =>{
   
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log('li,',decodedToken.id)
    request.id =decodedToken.id
    if (decodedToken.id){
      request.user = decodedToken.user
    }
    next()
  }
  module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,userExtractor
  }