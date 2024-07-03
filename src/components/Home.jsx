import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      console.log('Token retrieved from localStorage: ', token);
      if (!token) {
        // Handle the case where there is no token
        return navigate('/login');
      }
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            'x-auth-token': token,
          },
        });
        if (!res.data) {
          console.log('No user data returned from the server. Redirecting to login page.');
          return navigate('/login');
        }
        setUser(res.data);
      } catch (err) {
        console.error(err);
        // Handle the error appropriately, maybe log the user out or show an error message
        navigate('/login');
      }
    };

    fetchUserDetails();
  }, [navigate]);

  return (
    <div>
      {user ? <div>Welcome, {user.name}</div> : <div>Loading...</div>}
    </div>
  );
};

export default Home;
