


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Favourite = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(' https://api.coinlore.net/api/ticker/?id=90');
        console.log(response);
        
        setData(response.data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // 👈 รันแค่ครั้งแรกเมื่อ component mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>ข้อมูล:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Favourite;
