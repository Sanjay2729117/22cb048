import React, { useEffect, useState } from 'react';

const TopUsers = () => {
  const [userData, setUserData] = useState([]); // Store user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchUserData = async () => {
      const url = "https://20.244.56.144/test/users";
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNDU1ODM0LCJpYXQiOjE3NDI0NTU1MzQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQ1Njc4MzA5LWU0ZDQtNGQwMi04OWY5LWRiMzQ5YTBiMzYzNCIsInN1YiI6IjIyY2IwNDhAZHJuZ3BpdC5hYy5pbiJ9LCJjb21wYW55TmFtZSI6ImdvTWFydCIsImNsaWVudElEIjoiZDU2NzgzMDktZTRkNC00ZDAyLTg5ZjktZGIzNDlhMGIzNjM0IiwiY2xpZW50U2VjcmV0IjoiQ09raVJFVE1MVUFlbm5WTyIsIm93bmVyTmFtZSI6InNhbmpheSIsIm93bmVyRW1haWwiOiIyMmNiMDQ4QGRybmdwaXQuYWMuaW4iLCJyb2xsTm8iOiIyMmNiMDQ4In0.2aVqu8Ezm-wSMPZjt9SURhkl_1AtdWokbQ7k8rUkC3M";
      
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json", 
          },
        });

        // Check for response status and handle errors
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        const users = Object.keys(data.users).map((id) => ({
          id,
          name: data.users[id],
        }));

        setUserData(users); // Update the state with the fetched user data
        setLoading(false); // Set loading to false after data is fetched
        console.log(users); // Log users data for debugging
      } catch (error) {
        setError(error.message); // Set error message if any
        console.error("Error fetching data:", error.message);
        setLoading(false); // Ensure loading is stopped even if there's an error
      }
    };

    fetchUserData(); // Call the async function to fetch data
  }, []); // Empty dependency array means this runs only once after the first render

  // Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error UI
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

  // Render user data
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Top Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userData.map((user) => (
          <div key={user.id} className="card">
            <h2>{user.name}</h2>
            {/* Render other user details if needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopUsers;
