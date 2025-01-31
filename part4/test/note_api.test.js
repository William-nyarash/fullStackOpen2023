// const request = require('supertest');
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const app = require('../app'); 
const blog = require('../models/blogs');
const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose');
const config = require('../utils/config');
const supertest = require('supertest');
const helper = require('./blog_helper')
 
// call the app as a superagent 
const api = supertest(app);

const Blog = require('../models/blogs');
const { title } = require('node:process');

// //  create initial blog posts
// const initialBlogpost =[
//   {
//     title :'Aspect-Oriented Programming is Quantification and Obliviousness',
//     author:'Filman Friedman',
//     url:'https://homepages.cwi.nl/~storm/teaching/reader/FilmanFriedman00.pdf',
//     likes:20
//   },
//   {
//     title :'the african silicon valley',
//     author:'waren djanabi',
//     url:'htpps://www.google.com',
//     likes:22
//   }
// ]


describe('When there is initially one user in the database', ()=>{
        beforeEach(async ()=>{
            await User.deleteMany({})

            hashedPassword = await  bcrypt.hash( 'secrete' ,10)
            const user = new User({ username:'admin', password: hashedPassword})
            await user.save()
        })
        test('user is created successfully ',async ()=>{
          const initialUser = await helper.userInDb()

          const newUser = {
            username: 'jayalis',
            name:'jayalo otis',
            password:'salainen',
          }
          console.log('creating new user',newUser)
          await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.userInDb()
        assert.strictEqual(usersAtEnd.length, initialUser.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
      })
    
        //  pick it up from here you are to test the functionallity of concurent username
      test('if the username is not unique it should return an appropriate error message', async () =>{

        const userAtStart = await helper.userInDb()

        const duplicateUsername = {
          username:"admin",
          name:"waren otoyo",
          password:"ItsBeen@while"
        }

      const result =  await  api
        .post('/api/users')
        .send(duplicateUsername)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.userInDb()

        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(userAtStart.length, usersAtEnd.length)
      })
    })

describe("When there is initial two blogs saved", ()=>{
   beforeEach(async ()=>{
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogpost)
   })
   test("all blogs are returned as json", async ()=>{
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
   })
   test("all  blogs are returned", async ()=>{
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogpost.length)
   })
   test('a specific blog is part of the blogs', async ()=>{
    const response = await api.get('/api/blogs')

    const blogs = response.body.map(post=> post.title)
    assert(blogs.includes('the african silicon valley'))
   })
})

describe('Viewing a blog', ()=>{
  test("successful with a valid id",async()=>{
    const blog = await helper.blogsInDb()

    const blogToView = blog[0]

    const response = await api 
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    assert.deepStrictEqual(response.body,blogToView)
  })
  test("Fails with status code 404 if the file doesn't exist", async () => {
    const id = await helper.nonExistingId(); 

    await api
        .get(`/blogs/${id}`)
        .expect(404)
});

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('Addition of a new blog', () => {

  let initialBlogCount;

  beforeEach(async () => {
    initialBlogCount = (await helper.blogsInDb()).length;
  });

  test("Succeeds with data", async () => {
    const newBlog = {
      title: 'debugging 101',
      author: 'waren bilon',
      url: 'https://wecode.com/1o1d',
      likes: 23
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAfterAddition = await helper.blogsInDb();
    assert.strictEqual(blogsAfterAddition.length, initialBlogCount + 1);

    const titles = blogsAfterAddition.map(blog => blog.title);
    assert(titles.includes('debugging 101'));
  });

  test('Fails with status code 400 if data is invalid', async () => {
    const incompleteBlog = { author: "tedd boyo" };

    await api
      .post('/api/blogs')
      .send(incompleteBlog)
      .expect(400);

    const blogsAfterFailure = await helper.blogsInDb();
    assert.strictEqual(blogsAfterFailure.length, initialBlogCount);
  });

});

describe('deletion of a blog',()=>{
   test('successful deletion with code 204 ', async ()=>{
     const blogsAtStart = await helper.blogsInDb()
     const blogToDelete = blogsAtStart[0]

    await api
       .delete(`/api/blogs/${blogToDelete.id}`)
       .expect(204)

       const theLastBlog = await helper.blogsInDb()

       assert.strictEqual(theLastBlog.length, blogsAtStart.length -1)

       const blogs = theLastBlog.map(n => n.title)
       assert(!title.includes(theLastBlog.title))
   })
 })

after(async () => {
  // Close the database connection
  await mongoose.connection.close();
});
