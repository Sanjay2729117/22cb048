import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from '../Components/Cards'; // Assuming you have a Cards component

const TopUsers = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://20.244.56.144/test/users', {
          headers: {
            'Authorization': 'your-token-here', // Make sure your token is valid
          }
        });

        console.log(response.data); // Log the data for debugging

        // Assuming the response structure is something like:
        // { users: { "1": "sam1", "2": "sam2", ... }}
        
        const users = Object.keys(response.data.users).map((id) => ({
          id,
          name: response.data.users[id],
        }));

        setUserData(users); // Set the fetched user data
      } catch (err) {
        setError(err.message);
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false); // Set loading state to false after data is fetched
      }
    };

    fetchUserData();
  }, []); // Empty dependency array means this will run once after initial render

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  // Sorting the users by their `id` and getting the first 5
  const sortedUsers = [...userData].sort((a, b) => a.id - b.id).slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Top Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedUsers.map((user) => (
          <Cards key={user.id} name={user.name} />
        ))}
      </div>
    </div>
  );
};

export default TopUsers;
