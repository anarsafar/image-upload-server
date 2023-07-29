"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const image_1 = __importDefault(require("../controller/image"));
const multer_1 = __importDefault(require("multer"));
const Joi_1 = require("../middleware/Joi");
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
router.get('/', image_1.default.getImages);
router.get('/:imageID', image_1.default.getImage);
router.post('/upload', upload.single('image'), (0, Joi_1.ValidateJoi)(Joi_1.Schemas.images.upload), image_1.default.uploadImage);
module.exports = router;
