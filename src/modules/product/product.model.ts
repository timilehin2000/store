import mongoose, { Document, Schema } from "mongoose";
import { BaseModel, BaseSchema } from "../../database";
import { ICategory } from "../category";
import { IUser } from "../users/user.model";

export interface IProduct extends BaseModel {
    name: string;
    description: string;
    price: number;
    category: ICategory["_id"];
    stockQuantity: number;
    imageUrl?: string;
    userId: IUser["_id"];
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },

    description: {
        type: String,
        required: true,
        trim: true,
    },

    price: {
        type: Number,
        required: true,
        index: true,
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        index: true,
    },

    stockQuantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },

    imageUrl: {
        type: String,
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

ProductSchema.index({ category: 1, price: 1 });

ProductSchema.add(BaseSchema);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
