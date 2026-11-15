import { useState } from 'react';
import Header from './Header';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { getRandomUser } from '../data/users';

function formatTime(date) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newMessage = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      user: getRandomUser(),
      text: trimmed,
      likes: 0,
      timestamp: formatTime(new Date()),
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  const handleLike = (messageId) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
      )
    );
  };

  return (
    <div className="chat-window-card">
      <Header messageCount={messages.length} />
      <MessageList messages={messages} onLike={handleLike} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
