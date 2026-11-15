# Photo Gallery

A single-page Photo Gallery with infinite scrolling using the Picsum Photos API, built with React, Vite, JavaScript, and pure CSS.

## Features

- **Infinite Scrolling**: Automatically loads subsequent pages using the browser's native `IntersectionObserver` API as the user scrolls.
- **Request Management**: Prevents duplicate requests for the same page and guards against concurrent simultaneous requests.
- **Independent Like Button**: Each photo includes a blue thumbs-up button and like counter that increments on click, completely isolated from other photos.
- **State Preservation**: Like counts are preserved when new pages of photos are loaded.
- **Error & Edge Case Handling**: Gracefully handles API network errors with a retry option, image loading failures with a fallback placeholder, and displays an end-of-feed message when no more photos are available.
- **Clean Responsive Design**: Professional one-column layout with consistent image dimensions and aspect ratios, optimized for both desktop and mobile devices.

## Project Structure

```text
photo-gallery/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    ├── App.css
    └── components/
        ├── PhotoGallery.jsx
        └── PhotoItem.jsx
```

## Running the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

Open your browser at `http://localhost:3000` (or the port indicated in your terminal).

### 3. Build for Production
```bash
npm run build
```
