import express from 'express';
import controller from '../controller/image';
import multer from 'multer';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', controller.getImages);
router.get('/:imageID', controller.getImage);
router.post('/upload', upload.single('image'), ValidateJoi(Schemas.images.upload), controller.uploadImage);

export = router;
