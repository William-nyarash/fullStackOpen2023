const request = require('supertest');
const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const app = require('../app'); 
const blog = require('../models/blogs');
const mongoose = require('mongoose');
const config = require('../utils/config');
const supertest = require('supertest');
 
// call the app as a superagent 
const api = supertest(app);
beforeEach(async () => {
  // Connect to the test database
  await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});



test.only('notes are returned as json', async() => {
     await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/);

});
// check the number of notes
test('there are two blogs',async()=>{
  const response = await api.get('/api/blogs');
  assert.strictEqual(response.body.length,2)
})

after(async () => {
  // Close the database connection
  await mongoose.connection.close();
});