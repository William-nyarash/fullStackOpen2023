const Blogs = require ('../models/blogs');
const User = require('../models/user')

const initialBlogpost =[
    {
      title :'Aspect-Oriented Programming is Quantification and Obliviousness',
      author:'Filman Friedman',
      url:'https://homepages.cwi.nl/~storm/teaching/reader/FilmanFriedman00.pdf',
      likes:20
    },
    {
      title :'the african silicon valley',
      author:'waren djanabi',
      url:'htpps://google.com/list',
      likes:22
    }
  ]

  const nonExistingId = async () => {
    const blog = new Blogs({
      title: "None Functional Component",
      url: "http://dummy_data/nwe9",
      likes: 0,
    });
    await blog.save(); 
  
    const id = blog._id.toString();
    
    await Blogs.deleteOne({ _id: id }); 
  
    return id; 
  };
   
const blogsInDb =async ()=>{
 const blogs = await Blogs.find({})
 return blogs.map(blog => blog.toJSON())
}

const userInDb = async ()=>{
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogpost,nonExistingId, blogsInDb,userInDb,
}