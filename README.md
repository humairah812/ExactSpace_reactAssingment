# React Chat App

A modern, fast, and responsive single-page team chat application built with React, Vite, and modern CSS3. Designed with a clean SaaS aesthetic inspired by tools like Linear and Slack.

---

## 🚀 Live Demo & Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.0 or higher recommended)
- `npm`, `yarn`, or `pnpm`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<humairah812>/react-chat-app.git
   cd react-chat-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
# Build optimized production assets
npm run build

# Preview production build locally
npm run preview
```

---

## ✨ Key Features

- **Interactive Messaging:** Instant message sending with automatic smooth scrolling to the latest message.
- **Dynamic Team Roster:** Messages are randomly attributed to active team members (`Alan`, `Bob`, `Carol`, `Dean`, `Elin`).
- **Individual Likes:** Every message includes its own like counter with instant updates, multiple-click support, and an animated heart reaction.
- **Smart @Mentions:** Type `@` anywhere in the message input to trigger an autocomplete dropdown of team members with keyboard navigation (`ArrowUp` / `ArrowDown` / `Enter`).
- **Quick Reaction Emoji Picker:** Select from popular emojis to quickly insert them into messages.
- **Distinct Avatars:** Custom pastel avatar colors and badges for each team member.
- **Human-Readable Timestamps:** 12-hour formatted timestamps (`10:45 AM`) with full datetime tooltips.
- **Empty State:** Clean placeholder screen when starting a new conversation.
- **Responsive Layout:** Optimized for mobile, tablet, and desktop screens with full touch support.
- **Keyboard Shortcuts:**
  - `Enter`: Send message
  - `Shift + Enter`: New line
  - `Escape`: Close popups (emojis / mentions)

---

## 🛠️ Technology Stack

- **Framework:** [React 18](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Styling:** Vanilla CSS3 (Custom Properties, Flexbox, Grid, Keyframe Animations)
- **Language:** Modern JavaScript (ES6+)

---

## 📁 Project Structure

```
react-chat-app/
├── public/
│   └── chat-icon.svg             # Application logo
├── src/
│   ├── components/
│   │   ├── Header.jsx            # Header with online status & message count
│   │   ├── ChatWindow.jsx        # Main chat controller & state manager
│   │   ├── MessageList.jsx       # Scrollable message feed with empty state
│   │   ├── MessageItem.jsx       # Message row with avatar, content & like button
│   │   └── MessageInput.jsx      # Composer with auto-resizing, mentions & emojis
│   │
│   ├── data/
│   │   └── users.js              # Team user profiles and avatar palettes
│   │
│   ├── App.jsx                   # Main layout container
│   ├── App.css                   # Component styles & animations
│   ├── index.css                 # Base resets, variables, and typography
│   └── main.jsx                  # React application entry point
│
├── index.html                    # Root HTML document
├── package.json                  # Dependencies and scripts
└── vite.config.js                # Vite configuration
```

---

## 🎨 Design System

- **Background:** `#F8FAFC`
- **Card Surface:** `#FFFFFF`
- **Primary Accent:** `#635BFF`
- **Primary Text:** `#172033`
- **Secondary Text:** `#64748B`
- **Borders:** `#E8ECF2`
- **Online Indicator:** `#10B981`
