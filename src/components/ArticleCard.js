import React from 'react';
import './ArticleCard.css';

function ArticleCard({ title, description, url, imageUrl }) {
  return (
    <div className="card">
      <img src={imageUrl} alt="News" className="card-img" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Read More on Reddit
        </a>
      </div>
    </div>
  );
}

export default ArticleCard;
