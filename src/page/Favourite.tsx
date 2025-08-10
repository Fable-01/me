import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Favourite = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState([]);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const stored = localStorage.getItem('favoriteList');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        const idList = parsed.map((item) => item.ids);
        console.log(idList);
        
        setId(idList); // ⬅️ ใส่เฉพาะ id เข้า state
      } else {
        setId([]);
      }
    } catch (e) {
      console.error('Invalid JSON in favoriteList');
      setId([]);
    }
  }
}, []);


useEffect(() => {
  if (id.length === 0) return;

  const fetchData = async () => {
    try {
      const ids = id
      console.log(ids);
      
      const response = await axios.get(`https://api.coinlore.net/api/ticker/?id=${ids}`);
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [id]);


  if (!id || id.length === 0) return <>Please wait a second...</>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Favorite Coins</h1>
      <ul>
        {id.map((item, index) => (
          <li key={index}>{item || JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Favourite;
