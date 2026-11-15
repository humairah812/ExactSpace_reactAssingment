# ExactSpace React Assignments

A monorepo containing two frontend React applications developed for the **ExactSpace Frontend / UI Developer Internship Assignment**:

1. [**Chat App**](./chat-app/README.md) – A modern, single-page team conversation chat interface.
2. [**Photo Gallery**](./photo-gallery/README.md) – A high-performance photo stream with infinite scrolling and API integration.

---

## 📁 Repository Structure

```text
ExactSpace_reactAssingment/
│
├── chat-app/                     # Assignment 1: Chat Application
│   ├── docs/                     # Screenshot previews
│   ├── public/                   # Static assets & icons
│   ├── src/                      # React source code & components
│   │   ├── components/           # Header, ChatWindow, MessageList, MessageItem, MessageInput
│   │   ├── data/                 # Team member data roster
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── photo-gallery/                # Assignment 2: Infinite Scroll Photo Gallery
│   ├── public/                   # Static assets
│   ├── src/                      # React source code & components
│   │   ├── components/           # PhotoGallery, PhotoItem
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── .gitignore
└── README.md
```

---

## 💬 1. Chat App

A modern, fast, and responsive single-page team chat application designed with a clean SaaS aesthetic inspired by tools like Linear and Slack.

### Key Features
- **Message Sending:** Instant message submission with validation and automatic smooth scroll to the newest message.
- **Random User Attribution:** Each message is randomly attributed to an active team member (`Alan`, `Bob`, `Carol`, `Dean`, `Elin`).
- **Independent Like Counters:** Every message includes its own like button with real-time counters and animated heart reactions.
- **Smart @Mentions:** Typing `@` opens an interactive team member autocomplete dropdown with keyboard navigation.
- **Quick Emojis:** Quick reaction picker to seamlessly insert popular emojis.
- **Distinct Avatars & Timestamps:** Color-coded pastel avatars per user and 12-hour formatted timestamps.
- **Responsive Design:** Optimized across desktop, tablet, and mobile displays.

### Technologies Used
- React 18, Vite, Lucide React, Modern CSS3 (Flexbox, Grid, CSS Variables, Animations).

👉 **[View Chat App Documentation & Setup](./chat-app/README.md)**

---

## 📷 2. Photo Gallery

A single-page, responsive photo gallery with infinite scrolling powered by the Picsum Photos API.

### Key Features
- **Infinite Scrolling:** Automatically loads subsequent photo batches as the user scrolls using the native `IntersectionObserver` API.
- **API Request Management:** Guards against concurrent duplicate requests and manages network latency efficiently.
- **Independent Like Button:** Every photo includes an interactive like button and counter that updates independently.
- **State Preservation:** Like counts and loaded images persist seamlessly across infinite scroll page additions.
- **Error & Resilience Handling:** Gracefully handles API network errors with retry triggers, broken image placeholders, and an end-of-feed notification.
- **Responsive Grid:** Clean, consistent aspect ratio cards tailored for all screen sizes.

### Technologies Used
- React 18, Vite, Picsum Photos API, `IntersectionObserver`, CSS3.

👉 **[View Photo Gallery Documentation & Setup](./photo-gallery/README.md)**

---

## 🚀 Quick Start Guide

Each application operates independently with its own configuration and dependencies.

### Running the Chat App
```bash
cd chat-app
npm install
npm run dev
```

### Running the Photo Gallery
```bash
cd photo-gallery
npm install
npm run dev
```
