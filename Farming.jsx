import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FarmingNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Backend URL jahan se news fetch karni hai
  const BACKEND_URL = 'http://localhost:5000/news';

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(BACKEND_URL);
        setNews(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading farming news...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '20px' }}>
      <h2>Latest Farming & Agriculture News</h2>
      {news.length === 0 && <p>No news available.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {news.map((item) => (
          <li key={item.url} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#0077cc' }}>
              <h3>{item.title}</h3>
            </a>
            <p>{item.description}</p>
            <small>
              Source: {item.sourceName} | Published: {new Date(item.publishedAt).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FarmingNews;
