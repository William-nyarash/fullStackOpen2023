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

const mostBlogs= (blogs)=> {
    const authors = {};
    for (const blog of blogs) {
      if (!authors[blog.author]) {
        authors[blog.author] = 0;
      }
      authors[blog.author]++;
    }
    let maxAuthor = null;
    let maxBlogs = 0;
    for (const author in authors) {
      if (authors[author] > maxBlogs) {
        maxAuthor = author;
        maxBlogs = authors[author];
      }
    }
    const active = {
        author: maxAuthor, 
        blogs: maxBlogs 
    }
    return active;
  }
  

module.exports = {
    totalLikes,
    dummy,
    favoriteBlog,
    mostBlogs 
}
