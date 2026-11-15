import React, { useState } from 'react';

function PhotoItem({ photo }) {
  const [likes, setLikes] = useState(0);
  const [hasImageError, setHasImageError] = useState(false);

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  return (
    <div className="photo-card">
      <div className="photo-thumbnail">
        {hasImageError ? (
          <div className="photo-placeholder">Image unavailable</div>
        ) : (
          <img
            src={photo.download_url}
            alt={`Photo by ${photo.author}`}
            className="photo-image"
            loading="lazy"
            onError={() => setHasImageError(true)}
          />
        )}
      </div>

      <div className="photo-details">
        <span className="photo-author">{photo.author}</span>

        <div className="photo-actions">
          <button
            type="button"
            className="like-btn"
            onClick={handleLike}
            aria-label={`Like photo by ${photo.author}`}
          >
            <svg
              className="thumbs-up-icon"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
              />
            </svg>
          </button>
          <span className="like-count">{likes}</span>
        </div>
      </div>
    </div>
  );
}

export default PhotoItem;
