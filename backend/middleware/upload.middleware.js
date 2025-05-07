import multer from "multer";
import path from "path";

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in 'uploads/' folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // File extension
    cb(null, Date.now() + ext); // Use timestamp to avoid duplicate filenames
  },
});

// File filter to accept only images (jpeg, png, jpg)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // File accepted
  } else {
    cb(new Error("Only images (jpg, jpeg, png) are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
