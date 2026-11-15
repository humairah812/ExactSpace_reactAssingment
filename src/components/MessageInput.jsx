import { useState, useRef, useEffect } from 'react';
import { Send, Smile, AtSign, X } from 'lucide-react';
import { user_list, USER_PROFILES } from '../data/users';

const EMOJIS = [
  '👍', '❤️', '🔥', '🎉', '🚀', '✨', '👏', '🙌',
  '😀', '😂', '😍', '😎', '🥳', '💡', '💯', '👀',
  '🤝', '⚡', '☕', '✅',
];

export default function MessageInput({ onSendMessage }) {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [mentionQuery, setMentionQuery] = useState(null);
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0);

  const composerRef = useRef(null);
  const textareaRef = useRef(null);

  // Close popups when clicking outside the composer area
  useEffect(() => {
    function handleClickOutside(event) {
      if (composerRef.current && !composerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
        setMentionQuery(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  };

  const filteredUsers = mentionQuery !== null
    ? user_list.filter((user) => user.toLowerCase().startsWith(mentionQuery.toLowerCase()))
    : [];

  const handleInputChange = (e) => {
    const value = e.target.value;
    const cursorPos = e.target.selectionStart;
    setText(value);
    adjustTextareaHeight();

    // Check if user is typing an @mention
    const textBeforeCursor = value.slice(0, cursorPos);
    const atMatch = textBeforeCursor.match(/@([a-zA-Z]*)$/);

    if (atMatch) {
      setMentionQuery(atMatch[1]);
      setSelectedMentionIndex(0);
    } else {
      setMentionQuery(null);
    }
  };

  const handleMentionToggle = () => {
    if (mentionQuery !== null) {
      setMentionQuery(null);
      return;
    }

    const needsSpace = text.length > 0 && !text.endsWith(' ');
    const nextText = text + (needsSpace ? ' @' : '@');
    setText(nextText);
    setMentionQuery('');
    setSelectedMentionIndex(0);
    textareaRef.current?.focus();
  };

  const insertMention = (username) => {
    const textarea = textareaRef.current;
    const cursorPos = textarea ? textarea.selectionStart : text.length;
    const before = text.slice(0, cursorPos).replace(/@([a-zA-Z]*)$/, `@${username} `);
    const after = text.slice(cursorPos);

    setText(before + after);
    setMentionQuery(null);
    textarea?.focus();
  };

  const handleEmojiSelect = (emoji) => {
    const textarea = textareaRef.current;
    const cursorPos = textarea ? textarea.selectionStart : text.length;
    setText(text.slice(0, cursorPos) + emoji + text.slice(cursorPos));
    textarea?.focus();
  };

  const handleKeyDown = (e) => {
    // Keyboard navigation inside mentions dropdown
    if (mentionQuery !== null && filteredUsers.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedMentionIndex((prev) => (prev + 1) % filteredUsers.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedMentionIndex((prev) => (prev - 1 + filteredUsers.length) % filteredUsers.length);
        return;
      }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        insertMention(filteredUsers[selectedMentionIndex]);
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setMentionQuery(null);
        return;
      }
    }

    // Enter to submit (Shift + Enter creates a newline)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onSendMessage(trimmed);
    setText('');
    setMentionQuery(null);
    setShowEmojiPicker(false);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.focus();
    }
  };

  const canSend = text.trim().length > 0;

  return (
    <footer className="chat-composer-container" ref={composerRef}>
      {mentionQuery !== null && filteredUsers.length > 0 && (
        <div className="mention-dropdown" role="listbox">
          <div className="mention-dropdown-header">Mention team member</div>
          {filteredUsers.map((user, idx) => {
            const profile = USER_PROFILES[user];
            const isSelected = idx === selectedMentionIndex;
            return (
              <button
                type="button"
                key={user}
                className={`mention-option ${isSelected ? 'selected' : ''}`}
                onClick={() => insertMention(user)}
                onMouseEnter={() => setSelectedMentionIndex(idx)}
                role="option"
                aria-selected={isSelected}
              >
                <span
                  className="mention-mini-avatar"
                  style={{
                    backgroundColor: profile?.avatarBg || '#F1F5F9',
                    color: profile?.avatarColor || '#334155',
                  }}
                >
                  {user[0]}
                </span>
                <div className="mention-info">
                  <span className="mention-name">@{user}</span>
                  <span className="mention-role">{profile?.role}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {showEmojiPicker && (
        <div className="emoji-picker-popup">
          <div className="emoji-picker-header">
            <span>Quick Reactions & Emojis</span>
            <button
              type="button"
              className="close-emoji-btn"
              onClick={() => setShowEmojiPicker(false)}
              aria-label="Close emoji picker"
            >
              <X size={14} />
            </button>
          </div>
          <div className="emoji-grid">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                className="emoji-grid-btn"
                onClick={() => handleEmojiSelect(emoji)}
                title={emoji}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      <form className="composer-form" onSubmit={handleSubmit}>
        <div className="composer-input-card">
          <textarea
            ref={textareaRef}
            className="composer-textarea"
            placeholder="Write a message... (Type @ to mention team members)"
            value={text}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
            aria-label="Message input"
          />

          <div className="composer-bottom-bar">
            <div className="composer-actions-left">
              <button
                type="button"
                className={`composer-tool-btn emoji-toggle-btn ${showEmojiPicker ? 'active' : ''}`}
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                title="Add emoji"
                aria-label="Open emoji picker"
              >
                <Smile size={18} />
              </button>

              <button
                type="button"
                className={`composer-tool-btn mention-toggle-btn ${mentionQuery !== null ? 'active' : ''}`}
                onClick={handleMentionToggle}
                title="Mention someone (@)"
                aria-label="Mention team member"
              >
                <AtSign size={18} />
              </button>

              <span className="composer-shortcut-hint">
                <kbd>Enter</kbd> to send • <kbd>Shift + Enter</kbd> for new line
              </span>
            </div>

            <div className="composer-actions-right">
              <button
                type="submit"
                disabled={!canSend}
                className={`send-button ${canSend ? 'active' : ''}`}
                aria-label="Send message"
                title="Send message"
              >
                <span className="send-text">Send</span>
                <Send size={15} className="send-icon" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </footer>
  );
}
