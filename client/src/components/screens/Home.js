import React, { useEffect, useState } from 'react';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/allpost', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then(res => res.json())
    .then(result => {
      setPosts(result);
    })
  }, []);

  return (
    <div className="home">
  {posts.map(post => (
    <div className="card" key={post._id}>
      <h5>{post.title}</h5>
      <p>{post.body}</p>
      {post.image && <img src={`/${post.image}`} alt={post.title} />}
      {post.postedBy ? (
        <p>Posted by: {post.postedBy.name}</p>
      ) : (
        <p>Posted by: Unknown</p>
      )}
    </div>
  ))}
</div>

  );
}

export default Home;
