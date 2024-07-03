import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // Handle the case where there is no token
        return;
      }
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            'x-auth-token': token,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        // Handle the error appropriately, maybe log the user out or show an error message
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div>
      {user ? <div>Welcome, {user.name}</div> : <div>Loading...</div>}
    </div>
  );
};

export default Home;
