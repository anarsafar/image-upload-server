import express, { NextFunction, Request, Response } from 'express';
import { config } from './config/config';
import mongoose from 'mongoose';
import cors from 'cors';
import imageRoutes from './routes/image';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const router = express();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(cors());

mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log('MongoDB connected successfully');
        startServer();
    })
    .catch((err) => console.error(err));

const startServer = () => {
    // Log information about user requests
    router.use((req: any, res: any, next: any) => {
        console.log(`Incoming - Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            console.log(`Incoming - Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] `);
        });

        next();
    });

    router.use('/images', imageRoutes);

    router.get('/', (req: Request, res: Response, next: NextFunction) => res.status(200).json({ message: 'Welcome file upload API' }));

    // Error handling
    router.use((req: Request, res: Response, next: NextFunction) => {
        const errorMessage = new Error('Requested request not found');

        console.error(errorMessage);

        res.status(404).json({
            message: errorMessage.message
        });

        next();
    });

    router.listen(config.server.port, () => console.log(`Server is running on port ${config.server.port}`));
};
