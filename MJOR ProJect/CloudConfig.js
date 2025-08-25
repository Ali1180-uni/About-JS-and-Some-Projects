const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

if (!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_API_SECRET) {
    console.error('Missing required Cloudinary environment variables');
    process.exit(1);
}

// configure cloudinary v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Hi_Tour', // The name of the folder in cloudinary
        allowedFormats: ['png', 'jpg', 'jpeg'], // restricted to common image formats
        format: 'jpg' // optional: convert all images to jpg format
    },
});

module.exports = { storage, cloudinary };
