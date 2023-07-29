"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Image_1 = __importDefault(require("../model/Image"));
const storage_1 = require("firebase/storage");
const uploadImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }
        const existingImage = await Image_1.default.findOne({ fileName: req.file.originalname });
        if (existingImage) {
            return res.status(422).json({ error: 'Image already exist in database' });
        }
        const storage = (0, storage_1.getStorage)();
        const storageRef = (0, storage_1.ref)(storage, 'images/' + req.file.originalname);
        await (0, storage_1.uploadBytes)(storageRef, req.file.buffer);
        const downloadURL = await (0, storage_1.getDownloadURL)(storageRef);
        const image = new Image_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            fileName: req.file.originalname,
            url: downloadURL
        });
        image.save();
        res.status(200).json({ message: 'Image uploaded successfully' });
    }
    catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Image upload failed' });
    }
};
const getImages = async (req, res, next) => {
    try {
        Image_1.default.find()
            .then((images) => res.status(200).json({ images }))
            .catch((error) => res.status(500).json({ error }));
    }
    catch (error) {
        res.json({ error });
    }
};
const getImage = async (req, res, next) => {
    const { imageID } = req.params;
    try {
        Image_1.default.findById(imageID)
            .then((image) => (image ? res.status(200).json({ image }) : res.status(404).json({ message: 'not found' })))
            .catch((error) => res.status(500).json({ error }));
    }
    catch (error) {
        res.json({ error });
    }
};
exports.default = { uploadImage, getImages, getImage };
