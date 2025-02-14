const {info,error} = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  info('Method:', request.method)
  info('Path:  ', request.path)
  info('Body:  ', request.body)
  info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
const getToken  = (request, response, next) => {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) {
    return response.status(401).json({ error: 'Token missing or invalid' });
  }

  const token = authorizationHeader.split(' ')[1];

  if (!token) {
    return response.status(401).json({ error: 'Token missing or invalid' });
  }
  request.token = token;
  next();
};

const userExtractor = (request, response,next)=>{
  const token = request.headers.authorization && request.headers.authorization.split(' ')[1];
  if(!token){
    return response.status(401).json({message: 'authention token is required'});
  }
  try{
    const decoded = jwt.verify(token, process.env.SECRET)
    if(!decoded.id){
      return response.status(401).json({error: "token invalid"})
    }
    request.user = decoded
    next();
  } catch (error){
    return response.status(403).json()
  }
};
const errorHandler = (request, response, next) => {
  error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name ===  'JsonWebTokenError') {
  return response.status(401).json({ error: 'token invalid' })
}else if (error.name === 'TokenExpiredError') {
  return response.status(401).json({
    error: 'token expired'
  })
}
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getToken,
  userExtractor
}