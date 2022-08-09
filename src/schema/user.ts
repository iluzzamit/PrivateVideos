import { model, Schema } from "mongoose";
import { User as UserModel } from "../model/user";

const userSchema = new Schema<UserModel>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    token: { type: String },

    video: { type: String, required: true },
    expireDate: { type: Date, default: () => new Date(new Date().setMonth(new Date().getMonth()+1)) },
    isBlocked: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
});

export const User = model<UserModel>('User', userSchema)