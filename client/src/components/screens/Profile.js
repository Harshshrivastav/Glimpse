import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/signin');
    } else {
      fetch('/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          setUser(data);
        });

      fetch('/myposts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(result => {
          setPosts(result.mypost);
        });
    }
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <h1>{user.name}'s Profile</h1>
      <button className="btn" onClick={() => navigate('/editprofile')}>Edit Profile</button>
      <div className="gallery">
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
    </div>
  );
}

export default Profile;
