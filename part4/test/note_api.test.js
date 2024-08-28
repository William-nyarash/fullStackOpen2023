 const{test,after} = require('node:test')
 const mongoose = require('mongoose')
 const supertest = require('supertest')
 const app = require('../app')
 const { response } = require('express')

 const api = supertest(app)

 test('blogs returned as json',(res,req)=>{
     api.get('/api/notes')
     .expect(200)
     .expect('Content-Type',/application\/json/)

 })
after(async ()=>{
   await mongoose.connection.close()
})
