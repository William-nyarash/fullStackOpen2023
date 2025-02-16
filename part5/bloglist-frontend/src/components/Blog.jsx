import { useState } from "react";

const Blog = ({ blog, handleLike }) => {
  const [details, setDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleDetails = () => {
    setDetails(!details); 
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
          <p>Likes: {blog.likes || 0}</p>
          <button onClick={() => handleLike(blog)}>Like</button>
          <p>{blog.author}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
