import { useState } from 'react';
import { Heart } from 'lucide-react';
import { getUserProfile, user_list } from '../data/users';

const MENTION_REGEX = new RegExp(`(@(?:${user_list.join('|')}))\\b`, 'gi');

function renderFormattedContent(text) {
  if (!text) return '';

  const parts = text.split(MENTION_REGEX);
  return parts.map((part, index) => {
    const isMention = user_list.some(
      (user) => part.toLowerCase() === `@${user.toLowerCase()}`
    );

    if (isMention) {
      return (
        <span key={index} className="mention-tag">
          {part}
        </span>
      );
    }
    return part;
  });
}

export default function MessageItem({ message, onLike }) {
  const [bouncing, setBouncing] = useState(false);
  const profile = getUserProfile(message.user);

  const handleLike = () => {
    onLike(message.id);
    setBouncing(true);
  };

  const initialLetter = message.user ? message.user[0].toUpperCase() : '?';

  return (
    <article className="message-item">
      <div
        className="message-avatar"
        style={{
          backgroundColor: profile.avatarBg,
          color: profile.avatarColor,
          borderColor: profile.avatarBorder,
        }}
        aria-hidden="true"
      >
        <span className="avatar-letter">{initialLetter}</span>
      </div>

      <div className="message-body">
        <div className="message-header-row">
          <div className="message-author-info">
            <span className="message-author-name">{message.user}</span>
            <span className="message-author-role">{profile.role}</span>
          </div>
          <time className="message-timestamp">
            {message.timestamp}
          </time>
        </div>

        <div className="message-text">
          {renderFormattedContent(message.text)}
        </div>

        <div className="message-actions-row">
          <button
            type="button"
            className={`like-button ${message.likes > 0 ? 'liked' : ''} ${bouncing ? 'pop-anim' : ''}`}
            onClick={handleLike}
            onAnimationEnd={() => setBouncing(false)}
            aria-label={`Like message by ${message.user}`}
          >
            <Heart
              size={15}
              className="like-icon"
              fill={message.likes > 0 ? '#E11D48' : 'none'}
              stroke={message.likes > 0 ? '#E11D48' : '#64748B'}
            />
            <span className="like-counter">
              {message.likes}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
