import multer from "multer";

// Configure Multer to use memory storage
const storage = multer.memoryStorage();

// Create the upload middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
  fileFilter: (
    req: any,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    // Allow only specific file types
    const fileTypes = /jpeg|jpg|png|gif|pdf/; // Extend as needed
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(file.originalname.toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    return cb(new Error("Error: File type not supported!")); // Reject the file
  },
});

// Export the upload middleware
export default upload;
