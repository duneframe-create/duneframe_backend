const express = require('express');
const path = require('path');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const auth = require('../middleware/auth');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 },
});

function configureCloudinary() {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    const err = new Error(
      'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET'
    );
    err.status = 500;
    throw err;
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });
}

function uploadBufferToCloudinary(file) {
  configureCloudinary();

  const isVideo = String(file.mimetype || '').startsWith('video/');
  const isImage = String(file.mimetype || '').startsWith('image/');
  const resourceType = isVideo ? 'video' : isImage ? 'image' : 'auto';
  const baseName = path.parse(file.originalname || 'upload').name.replace(/[^\w-]+/g, '_').slice(0, 80);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'dune-frame',
        resource_type: resourceType,
        public_id: `${baseName}-${Date.now()}`,
        overwrite: false,
      },
      (error, result) => {
        if (error) {
          const err = new Error(error.message || 'Cloudinary upload failed');
          err.status = 502;
          reject(err);
          return;
        }
        resolve({
          url: result.secure_url || result.url,
          filename: result.public_id,
          resourceType: result.resource_type,
          bytes: result.bytes,
        });
      }
    );

    stream.end(file.buffer);
  });
}

// POST /api/upload — protected
// Images + videos → Cloudinary; URL stored in DB by admin forms
router.post('/', auth, upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded. Use form field name: file' });
    }

    const mime = String(req.file.mimetype || '');
    if (!mime.startsWith('image/') && !mime.startsWith('video/')) {
      return res.status(400).json({ message: 'Only image and video uploads are supported' });
    }

    const result = await uploadBufferToCloudinary(req.file);

    res.status(201).json({
      message: 'Uploaded to Cloudinary',
      filename: result.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: result.url,
      provider: 'cloudinary',
      resourceType: result.resourceType,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
