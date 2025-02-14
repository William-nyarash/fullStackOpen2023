const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const app = require('../app');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./blog_helper');
const jwt = require('jsonwebtoken');

const api = supertest(app);

const Blog = require('../models/blogs');

describe('user actions in the database after token authentication', () => {
    let token;

    beforeEach(async () => {
        await Blog.deleteMany({});
        await User.deleteMany({});

        const hashedPassword = await bcrypt.hash('secrete', 10);
        const user = new User({ username: 'admin',name:"waren dev", passwordH: hashedPassword });
        await user.save();

       
        token = jwt.sign({ id: user.id }, process.env.SECRET);
    });

    test('user is created successfully', async () => {
        const initialUser = await helper.userInDb();

        const newUser = {
            username: 'jayalis',
            name: 'jayalo otis',
            password: 'salainen',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.userInDb();
        assert.strictEqual(usersAtEnd.length, initialUser.length + 1);

        const usernames = usersAtEnd.map(u => u.username);
        assert(usernames.includes(newUser.username));
    });

    test('if the username is not unique it should return an appropriate error message', async () => {
        const userAtStart = await helper.userInDb();

        const duplicateUsername = {
            username: "admin",
            name: "waren otoyo",
            password: "ItsBeen@while",
        };

        const result = await api
            .post('/api/users')
            .send(duplicateUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.userInDb();

        assert(result.body.error.includes('expected `username` to be unique'));

        assert.strictEqual(userAtStart.length, usersAtEnd.length);
    });


     beforeEach( async ()=>{  
         await Blog.insertMany(helper.initialBlogpost);
        })
    test('all blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('all blogs are returned', async () => {
        const response = await api
        .get('/api/blogs')
        .set('Authorization',`Bearer ${token}`)
        assert.strictEqual(response.body.length, helper.initialBlogpost.length);
    });

    test('a specific blog is part of the blogs', async () => {
        const response = await api
        .get('/api/blogs')
        .set('Authorization',`Bearer ${token}`)
        const blogs = response.body.map(post => post.title);
        assert(blogs.includes('the african silicon valley'));
    });
});

describe('Viewing a blog', () => {
    beforeEach( async()=>{
        await Blog.deleteMany({});
        await User.deleteMany({});
        await Blog.insertMany(helper.initialBlogpost)

        const hashedPassword = await bcrypt.hash('secrete', 10);
        const user = new User({ username: 'admin',name:"waren dev", passwordH: hashedPassword });
        await user.save();
       
        token = jwt.sign({ id: user.id }, process.env.SECRET);
    })
    test('successful with a valid id', async () => {
        const blog = await helper.blogsInDb();
       
        const blogToView = blog[0];

        const response = await api
            .get(`/api/blogs/${blogToView.id}`)
            .set('Authorization',`Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        assert.deepStrictEqual(response.body, blogToView);
    });

    test("Fails with status code 404 if the file doesn't exist", async () => {
        const id = await helper.nonExistingId();

        await api
            .get(`/blogs/${id}`)
            .set('Authorization',`Bearer ${token}`)
            .expect(404);
    });

    test('fails with status code 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445';

        await api
            .get(`/api/blogs/${invalidId}`)
            .set('Authorization',`Bearer ${token}`)
            .expect(400);
    });
});

describe('Addition of a new blog', () => {
    let initialBlogCount;
    beforeEach( async()=>{
        await Blog.deleteMany({});
        await User.deleteMany({});
        await Blog.insertMany(helper.initialBlogpost)

        const hashedPassword = await bcrypt.hash('secrete', 10);
        const user = new User({ username: 'admin',name:"waren dev", passwordH: hashedPassword });
        await user.save();
       
        initialBlogCount = (await helper.blogsInDb()).length;
        token = jwt.sign({ id: user.id }, process.env.SECRET);
    })


    test('Succeeds with valid token and data', async () => {
        const newBlog = {
            title: 'debugging 101',
            author: 'waren bilon',
            url: 'https://wecode.com/1o1d',
            likes: 23,
        };

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsAfterAddition = await helper.blogsInDb();
        assert.strictEqual(blogsAfterAddition.length, initialBlogCount + 1);

        const titles = blogsAfterAddition.map(blog => blog.title);
        assert(titles.includes('debugging 101'));
    });

    test('Fails with status code 401 if no token is provided', async () => {
        const newBlog = {
            title: 'debugging 101',
            author: 'waren bilon',
            url: 'https://wecode.com/1o1d',
            likes: 23,
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401) 
            .expect('Content-Type', /application\/json/);

        const blogsAfterFailure = await helper.blogsInDb();
        assert.strictEqual(blogsAfterFailure.length, initialBlogCount);
    });

    test('Fails with status code 400 if data is invalid', async () => {
        const incompleteBlog = { author: 'tedd boyo' };

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(incompleteBlog)
            .expect(400);

        const blogsAfterFailure = await helper.blogsInDb();
        assert.strictEqual(blogsAfterFailure.length, initialBlogCount);
    });
});

describe('Deletion of a blog', () => {
    let blogToDelete
    let blogsAtStart
    beforeEach(async () => {
        await Blog.deleteMany({});
        await User.deleteMany({});
        const hashedPassword = await bcrypt.hash('secrete', 10);
        const user = new User({ username: 'admin', name: "waren dev", passwordH: hashedPassword });
        await user.save();
      

        const blog = new Blog({
            title :'the african silicon valley',
            author:'waren djanabi',
            url:'htpps://google.com/list',
            user: user.id  
        });
        await blog.save();
      
        token = jwt.sign({ id: user.id }, process.env.SECRET);
      });
      
      test('successful deletion with code 204', async () => {
        blogsAtStart = await helper.blogsInDb();
        blogToDelete = blogsAtStart[0];
    
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204);
        
        const theLastBlog = await helper.blogsInDb();
        console.log("Blogs after deletion:", theLastBlog.length);
    
        assert.strictEqual(theLastBlog.length, blogsAtStart.length - 1);
    
        const blogs = theLastBlog.map(n => n.title);
        assert(!blogs.includes(blogToDelete.title));
    });
    
});
after(async () => {
    await mongoose.connection.close();
});
