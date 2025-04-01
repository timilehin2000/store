import { Schema, model } from "mongoose";
import { BaseModel, BaseSchema } from "../../database";
import { UserRoleEnum } from "../../interfaces";

export interface IUser extends BaseModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRoleEnum;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: Object.values(UserRoleEnum),
        default: UserRoleEnum.USER,
    },
});

UserSchema.index({ email: 1 }, { unique: true });

UserSchema.add(BaseSchema);

export const User = model<IUser>("User", UserSchema);
