import { ObjectId, Schema, model, models } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    image: string;
    createdAt: Date;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

const User = models?.User || model("User", UserSchema)

export default User;
