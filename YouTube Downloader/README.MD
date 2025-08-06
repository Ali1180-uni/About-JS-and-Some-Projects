# MERN Stack YouTube Downloader

A full-stack YouTube video downloader built with MongoDB, Express.js, React, and Node.js.

## 🚀 Features

- *Video Info Extraction*: Get video details, thumbnails, duration, and available formats
- *Multiple Quality Options*: Download in different resolutions and formats
- *Real-time Progress*: Track download progress with live updates
- *Download Management*: View, download, and delete completed files
- *Responsive UI*: Modern, mobile-friendly interface
- *File Storage*: Organized file management system

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## 🛠 Installation

### Backend Setup

1. Create a new directory and navigate to it:
bash
mkdir youtube-downloader-mern
cd youtube-downloader-mern
mkdir backend
cd backend


2. Initialize npm and install dependencies:
bash
npm init -y
npm install express cors ytdl-core mongoose uuid
npm install -D nodemon


3. Create package.json scripts:
json
{
  "name": "youtube-downloader-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "ytdl-core": "^4.11.5",
    "mongoose": "^7.5.0",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}


4. Create the server.js file (use the backend code provided above)

5. Create downloads directory:
bash
mkdir downloads


### Frontend Setup

1. Navigate back to root and create React app:
bash
cd ..
npx create-react-app frontend
cd frontend


2. Install additional dependencies:
bash
npm install lucide-react


3. Replace the contents of src/App.js with the frontend code provided above

4. Update src/index.css:
css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


5. Install and configure Tailwind CSS:
bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


6. Configure tailwind.config.js:
javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


## 🗄 Database Setup

1. *Local MongoDB*: Make sure MongoDB is running on your system
2. *MongoDB Atlas*: Update the connection string in server.js with your Atlas URL

## 🚀 Running the Application

1. *Start MongoDB* (if using local installation)

2. *Start the backend server*:
bash
cd backend
npm run dev

Server will run on http://localhost:5000

3. *Start the React frontend* (in a new terminal):
bash
cd frontend
npm start

Frontend will run on http://localhost:3000

## 📁 Project Structure


youtube-downloader-mern/
├── backend/
│   ├── downloads/          # Downloaded video files
│   ├── server.js          # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   └── index.css      # Tailwind styles
│   └── package.json
└── README.md


## 🔧 API Endpoints

- POST /api/video-info - Get video information
- POST /api/download - Start video download
- GET /api/download/:id/progress - Get download progress
- GET /api/downloads - Get all downloads
- GET /api/download/:id/file - Download completed file
- DELETE /api/download/:id - Delete download and file

## 🎯 Usage

1. *Enter YouTube URL*: Paste any YouTube video URL in the input field
2. *Get Video Info*: Click "Get Info" to fetch video details and available formats
3. *Select Quality*: Choose your preferred video quality/format
4. *Start Download*: Click "Start Download" to begin the download process
5. *Monitor Progress*: Watch real-time download progress
6. *Download File*: Once complete, download the file to your device
7. *Manage Downloads*: View, download, or delete previous downloads

## ⚠ Important Notes

### Legal Considerations
- YouTube's Terms of Service prohibit downloading videos
- This tool should only be used for:
  - Educational purposes
  - Personal use with own content
  - Content you have permission to download
  - Fair use scenarios

### Technical Limitations
- YouTube frequently updates their systems, which may break functionality
- Some videos may be geo-restricted or age-restricted
- Large files require significant server storage and bandwidth
- Consider implementing user authentication and rate limiting for production use

### Security Recommendations
- Add input validation and sanitization
- Implement rate limiting to prevent abuse
- Add user authentication for production deployment
- Use environment variables for sensitive configuration
- Implement proper error logging and monitoring

## 🔒 Production Deployment

For production deployment, consider:

1. *Environment Variables*:
bash
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=production


2. *Security Headers*: Add helmet.js for security headers
3. *Rate Limiting*: Implement express-rate-limit
4. *File Cleanup*: Add scheduled cleanup for old downloads
5. *Load Balancing*: Use PM2 or similar for process management
6. *Reverse Proxy*: Use Nginx for serving static files and load balancing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes only. Please respect YouTube's Terms of Service and copyright laws.

## 🐛 Troubleshooting

*Common Issues:*

1. *MongoDB Connection Failed*: Ensure MongoDB is running and connection string is correct
2. *ytdl-core Errors*: YouTube changes may break functionality - check for library updates
3. *CORS Issues*: Ensure backend CORS is properly configured
4. *File Not Found*: Check if downloads directory exists and has proper permissions
5. *Port Already in Use*: Change ports in server.js and frontend API calls

*Performance Tips:*

- Clean up old downloads regularly
- Monitor disk space usage
- Implement download queuing for high traffic
- Consider using cloud storage for downloaded files
- Add compression for large video files