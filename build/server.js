"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const image_1 = __importDefault(require("./routes/image"));
const app_1 = require("firebase/app");
// Initialize Firebase
const app = (0, app_1.initializeApp)(config_1.config.firebaseConfig);
const router = (0, express_1.default)();
router.use(express_1.default.urlencoded({ extended: true }));
router.use(express_1.default.json());
router.use((0, cors_1.default)());
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    console.log('MongoDB connected successfully');
    startServer();
})
    .catch((err) => console.error(err));
const startServer = () => {
    // Log information about user requests
    router.use((req, res, next) => {
        console.log(`Incoming - Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            console.log(`Incoming - Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] `);
        });
        next();
    });
    router.use('/images', image_1.default);
    router.get('/', (req, res, next) => res.status(200).json({ message: 'Welcome file upload API' }));
    // Error handling
    router.use((req, res, next) => {
        const errorMessage = new Error('Requested request not found');
        console.error(errorMessage);
        res.status(404).json({
            message: errorMessage.message
        });
        next();
    });
    router.listen(config_1.config.server.port, () => console.log(`Server is running on port ${config_1.config.server.port}`));
};
