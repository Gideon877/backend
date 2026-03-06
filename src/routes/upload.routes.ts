import { Router } from 'express';
import { handleUpload } from '../controllers/upload.controller.js';
import { upload } from '../middleware/multer.config.js';

const router = Router();

// 'file' is the key the frontend must use in FormData
router.post('/upload', upload.single('file'), handleUpload);

export default router;