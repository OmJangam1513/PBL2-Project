"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getNews } from "../services/newsService";
import "../styles/News.css";

function News({ goBack }) {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await getNews(user.id);
        setNews(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [user.id]);

  if (loading) return <div className="loading">Loading news...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="news-container">
      <button className="back-button" onClick={() => goBack && goBack()}>Back</button>
      <h2>News</h2>
      <div className="news-list">
        {news?.items?.map((item) => (
          <div key={item.id} className="news-item">
            <h3 className="news-title">{item.title}</h3>
            <p className="news-content">{item.content}</p>
            <span className="news-date">{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;