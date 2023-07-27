import mongoose, { Schema, Document } from 'mongoose';

export interface ImageDocument {
    fileName: string;
    url: string;
}

export interface ImageFile {
    fieldname: 'image';
    originalname: string;
    buffer: Buffer;
    encoding: string;
    mimetype: string;
    size: number;
}

export interface ImageDocumentModel extends ImageDocument, Document {}

const imageSchema = new Schema<ImageDocumentModel>(
    {
        fileName: { type: String, required: true },
        url: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

const Image = mongoose.model<ImageDocumentModel>('Image', imageSchema);

export default Image;
