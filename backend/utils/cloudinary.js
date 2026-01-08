// config/cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;

const configureCloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true, // Use HTTPS for security
    });
    console.log('✅ Cloudinary configured successfully');
  } catch (error) {
    console.error('❌ Cloudinary configuration failed:', error);
    process.exit(1); // Exit if configuration fails
  }
};

module.exports = configureCloudinary;
