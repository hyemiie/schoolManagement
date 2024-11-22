const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_images', 
    allowed_formats: ['jpeg', 'png', 'jpg'], 
  },
});

const upload = multer({ storage });

module.exports = upload;
