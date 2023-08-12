import {
    Document,
    Schema,
    model,
} from 'mongoose'
import { UserBase } from './bases/UserBase';

export interface IUser extends Document, UserBase {}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, required: true },
    surname: { type: String, required: true }
});

export const User = model<IUser>('User', userSchema);