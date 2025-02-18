import { useState } from "react";

const Blog = ({ blog, handleLikes, likes }) => {
  const [details, setDetails] = useState(false); // Initially, details are hidden

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleDetails = () => {
    setDetails(!details); // Toggle between true and false
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button onClick={toggleDetails}>
          {details ? 'Hide' : 'View'}
        </button>
      </div>
      {details && (
        <div>
          <p>{blog.title}</p>
          <p>{blog.url}</p> 
          <p>Likes: {likes}<button onClick={handleLikes}>Like</button> </p>
          <p>{blog.author}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
