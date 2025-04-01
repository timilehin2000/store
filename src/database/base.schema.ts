import { Document, Schema } from "mongoose";

export interface BaseModel extends Document {
    _id: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

export const BaseSchema = new Schema<BaseModel>(
    {
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
    }
);
