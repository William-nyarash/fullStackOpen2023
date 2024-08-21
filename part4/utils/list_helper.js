const dummy =(blogs)=>{
    number = 1;
return number;
}
const totalLikes =(blogs)=> {
    return blogs.reduce((total, blog) => total + blog.likes, 0);
  }
const favoriteBlog=(blogs)=>{
        let maxLikes = 0;
        let favoriteBlog = null;
    
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].likes > maxLikes) {
                maxLikes = blogs[i].likes;
                favoriteBlog = blogs[i];
            }
        }
     const finalResult = {
        title:favoriteBlog.title,
        author:favoriteBlog.author,
        likes:favoriteBlog.likes
     }
        return finalResult;
}

// Function to find the author with the most blogs
const mostBlogs = (blogs) => {
  const authorCount = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});

  const topAuthor = Object.entries(authorCount).reduce((prev, current) => {
    return (prev[1] > current[1]) ? prev : current;
  });

  return { author: topAuthor[0], blogs: topAuthor[1] };
};
// Function to find the author with the most likes
const mostLikes = (blogs) => {
  const authorLikes = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
    return acc;
  }, {});

  const topAuthor = Object.entries(authorLikes).reduce((prev, current) => {
    return (prev[1] > current[1]) ? prev : current;
  });

  return { author: topAuthor[0], likes: topAuthor[1] };
};
  

module.exports = {
    totalLikes,
    dummy,
    favoriteBlog,
    mostBlogs,
    mostLikes 
}
