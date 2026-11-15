import { MessageSquare, Users } from 'lucide-react';
import { user_list } from '../data/users';

export default function Header({ messageCount = 0 }) {
  return (
    <header className="chat-header">
      <div className="header-left">
        <div className="app-icon-wrapper" aria-hidden="true">
          <MessageSquare className="app-icon" size={22} strokeWidth={2.2} />
          <span className="online-badge-dot" />
        </div>
        <div className="header-titles">
          <div className="title-row">
            <h1 className="header-title">Chat App</h1>
            <span className="live-status-pill">
              <span className="pulse-dot" />
              Online
            </span>
          </div>
          <p className="header-subtitle">Team Conversation</p>
        </div>
      </div>

      <div className="header-right">
        <div className="team-avatars-preview">
          <Users size={16} className="team-icon" />
          <span className="team-count">{user_list.length} members</span>
        </div>
        {messageCount > 0 && (
          <div className="message-count-badge">
            <span>{messageCount} {messageCount === 1 ? 'message' : 'messages'}</span>
          </div>
        )}
      </div>
    </header>
  );
}
