"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8080;
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster.mjzp3pa.mongodb.net/image-upload`;
const FIREBASE_API = process.env.FIRE_BASE_API || '';
const AUTH_DOMAIN = process.env.AUTH_DOMAIN || '';
const PROCJECT_ID = process.env.PROCJECT_ID || '';
const STORAGE_BUCKET = process.env.STORAGE_BUCKET || '';
const SENDER = process.env.SENDER || '';
const APP_ID = process.env.APP_ID || '';
const MEASUREMENT_ID = process.env.MEASUREMENT_ID || '';
exports.config = {
    mongo: {
        username: MONGO_USERNAME,
        password: MONGO_PASSWORD,
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    },
    firebaseConfig: {
        apiKey: FIREBASE_API,
        authDomain: AUTH_DOMAIN,
        projectId: PROCJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: SENDER,
        appId: APP_ID,
        measurementId: MEASUREMENT_ID
    }
};
