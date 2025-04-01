import { Schema, model } from "mongoose";
import { BaseModel, BaseSchema } from "../../database";

export interface ICategory extends BaseModel {
    name: string;
    description: string;
    email: string;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const CatergorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },

    description: {
        type: String,
        required: true,
    },
});

CatergorySchema.add(BaseSchema);

export const Catergory = model<ICategory>("Category", CatergorySchema);
