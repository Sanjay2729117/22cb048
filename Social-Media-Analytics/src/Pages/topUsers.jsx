import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from '../Components/Cards';
const topUsers = () => {
  const [userData, setUserData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const url = "https://20.244.56.144/test/users";  
  //     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNDU3MTczLCJpYXQiOjE3NDI0NTY4NzMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQ1Njc4MzA5LWU0ZDQtNGQwMi04OWY5LWRiMzQ5YTBiMzYzNCIsInN1YiI6IjIyY2IwNDhAZHJuZ3BpdC5hYy5pbiJ9LCJjb21wYW55TmFtZSI6ImdvTWFydCIsImNsaWVudElEIjoiZDU2NzgzMDktZTRkNC00ZDAyLTg5ZjktZGIzNDlhMGIzNjM0IiwiY2xpZW50U2VjcmV0IjoiQ09raVJFVE1MVUFlbm5WTyIsIm93bmVyTmFtZSI6InNhbmpheSIsIm93bmVyRW1haWwiOiIyMmNiMDQ4QGRybmdwaXQuYWMuaW4iLCJyb2xsTm8iOiIyMmNiMDQ4In0.uiXKldQuJAFg9bIZT5r98jThHPJi6jgGzaNmEer63yA';  

  //     try {
  //       const agent = new https.Agent({
  //         rejectUnauthorized: false
  //       });

  //       const response = await axios.get(url, {
  //         headers: {
  //           "Authorization": `Bearer ${token}`, 
  //           "Content-Type": "application/json"
  //         },
  //         httpsAgent: agent,  
  //       });
  //       const data = response.data;
  //       const users = Object.keys(data.users).map((id) => ({
  //         id,
  //         name: data.users[id],
  //       }));

  //       setUserData(users); 
  //       setLoading(false); 
  //       console.log(users);

  //     } catch (error) {
  //       setError(error.message);
  //       console.error("Error fetching data:", error.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserData(); 
  // }, []); 
  let data = {
    "users": {
      "1": "sam1",
      "2": "sam2",
      "3": "sam3",
      "4": "sam4",
      "5": "sam5",
      "6": "sam6",
      "7": "sam7",
      "8": "sam8",
      "9": "sam9",
      "10": "sam10",
      "11": "sam11",
      "12": "sam12",
      "13": "sam13",
      "14": "sam14",
      "15": "sam15",
      "16": "sam16",
      "17": "sam17",
      "18": "sam18",
      "19": "sam19",
      "20": "sam20"
    }
  }
  setUserData(data)

  if (!error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Top Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data['users'].map((user) => (
         <Cards name={user.name}/>
        ))
        }
      </div>
    </div>
  );
};

export default topUsers;
