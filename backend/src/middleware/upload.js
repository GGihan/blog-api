import multer from "multer";

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']

// Configure Multer to hold files in temporary RAM first
const storage = multer.memoryStorage();

// Initialize the Multer middleware instance with options for safety
const uploadSingleFile = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} is not supported.`), false);
    }
  }
})
.single('file');

export { uploadSingleFile };