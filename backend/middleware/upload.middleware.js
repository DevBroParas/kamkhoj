import multer from "multer";
import path from "path";

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in 'uploads/' folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // File extension
    cb(null, `${Date.now()}-${file.fieldname}${ext}`); // Unique file name
  },
});

// File filter to accept only resume and cover letter document formats
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error("Only .pdf, .doc, and .docx files are allowed for upload!"),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB size limit (optional)
});

export default upload;
