import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleCard from '../components/ArticleCard';
import LoadingSpinner from '../components/LoadingSpinner';
import './NewsFeed.css';

function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://www.reddit.com/r/indiansports/new.json'
        );
        const posts = response.data.data.children.map((child) => {
          // Use higher resolution image if available
          const previewImage = child.data.preview?.images[0]?.source?.url.replace(/&amp;/g, '&');
          const imageUrl = previewImage || 
            (child.data.thumbnail.startsWith("http") ? child.data.thumbnail : "https://www.redditinc.com/assets/images/site/reddit-logo.png");
          
          return {
            title: child.data.title,
            description: child.data.selftext || "No description available.",
            url: `https://reddit.com${child.data.permalink}`,
            imageUrl: imageUrl,
          };
        });
        setArticles(posts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError(error.message || 'Unknown error occurred.');
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="news-feed">
      <h1>Latest Indian Sports News from Reddit</h1>
      {error && <div className="error-message">Error: {error}</div>}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="article-list">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <ArticleCard
                key={index}
                title={article.title}
                description={article.description}
                url={article.url}
                imageUrl={article.imageUrl}
              />
            ))
          ) : (
            <div>No articles available</div>
          )}
        </div>
      )}
    </div>
  );
}

export default NewsFeed;
