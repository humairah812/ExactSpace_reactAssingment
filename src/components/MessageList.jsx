import { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import { MessageSquareDashed, Sparkles } from 'lucide-react';
import { user_list } from '../data/users';

export default function MessageList({ messages, onLike }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="chat-messages-container empty-state-container">
        <div className="empty-state-content">
          <div className="empty-icon-circle">
            <MessageSquareDashed size={36} className="empty-icon" />
          </div>
          <h2 className="empty-title">No messages yet</h2>
          <p className="empty-description">
            Be the first to start the team conversation! When you send a message,
            it will be randomly attributed to one of our team members:
          </p>
          <div className="empty-user-chips">
            {user_list.map((user) => (
              <span key={user} className="empty-chip">
                @{user}
              </span>
            ))}
          </div>
          <div className="empty-hint">
            <Sparkles size={14} className="sparkle-icon" />
            <span>Type below and press <kbd>Enter</kbd> to send</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-messages-container" tabIndex={0} aria-label="Conversation messages">
      <div className="messages-stream">
        <div className="conversation-start-divider">
          <span>Today</span>
        </div>
        {messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            onLike={onLike}
          />
        ))}
        <div ref={bottomRef} className="scroll-anchor" aria-hidden="true" />
      </div>
    </div>
  );
}
