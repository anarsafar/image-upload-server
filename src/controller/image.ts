import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Image from '../model/Image';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        const existingImage = await Image.findOne({ fileName: req.file.originalname });

        if (existingImage) {
            return res.status(422).json({ error: 'Image already exist in database' });
        }

        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + req.file.originalname);
        await uploadBytes(storageRef, req.file.buffer);

        const downloadURL = await getDownloadURL(storageRef);

        const image = new Image({
            _id: new mongoose.Types.ObjectId(),
            fileName: req.file.originalname,
            url: downloadURL
        });

        image.save();

        res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Image upload failed' });
    }
};

const getImages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        Image.find()
            .then((images) => res.status(200).json({ images }))
            .catch((error) => res.status(500).json({ error }));
    } catch (error) {
        res.json({ error });
    }
};

const getImage = async (req: Request, res: Response, next: NextFunction) => {
    const { imageID } = req.params;

    try {
        Image.findById(imageID)
            .then((image) => (image ? res.status(200).json({ image }) : res.status(404).json({ message: 'not found' })))
            .catch((error) => res.status(500).json({ error }));
    } catch (error) {
        res.json({ error });
    }
};

export default { uploadImage, getImages, getImage };
