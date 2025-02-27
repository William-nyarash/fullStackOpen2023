const router = require('express').Router()
const Blogs = require('../models/blogs')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  try {
    await Blogs.deleteMany({})
    await User.deleteMany({})
    response.status(204).end()
  } catch (error) {
    console.error('Error resetting database:', error.message)
    response.status(500).json({ error: error.message }) 
  }
})

module.exports = router
