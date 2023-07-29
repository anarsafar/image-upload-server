"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schemas = exports.ValidateJoi = void 0;
const joi_1 = __importDefault(require("joi"));
const ValidateJoi = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.file);
            next();
        }
        catch (error) {
            console.error(error);
            return res.status(422).json({ error });
        }
    };
};
exports.ValidateJoi = ValidateJoi;
exports.Schemas = {
    images: {
        upload: joi_1.default.object({
            fieldname: joi_1.default.string().required(),
            originalname: joi_1.default.string().required(),
            encoding: joi_1.default.string().required(),
            mimetype: joi_1.default.string().required(),
            buffer: joi_1.default.any().required(),
            size: joi_1.default.number().required()
        })
    }
};
