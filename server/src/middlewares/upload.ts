import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
  url: process.env.DB_URL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (_req, file) => {
    const match = ['image/png', 'image/jpeg'];
    const filename = `${Date.now()}-${file.originalname}`;

    if (!match.includes(file.mimetype)) {
      return filename;
    }

    return {
      bucketName: 'photos',
      filename,
    };
  },
});

const upload = multer({ storage });

export default upload;
