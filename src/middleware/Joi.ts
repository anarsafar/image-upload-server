import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { ImageFile } from 'model/Image';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.file);
            next();
        } catch (error) {
            console.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    images: {
        upload: Joi.object<ImageFile>({
            fieldname: Joi.string().required(),
            originalname: Joi.string().required(),
            encoding: Joi.string().required(),
            mimetype: Joi.string().required(),
            buffer: Joi.any().required(),
            size: Joi.number().required()
        })
    }
};
