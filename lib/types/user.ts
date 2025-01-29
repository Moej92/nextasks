import { ObjectId } from "mongoose";

export interface IUserInfo {
  _id: ObjectId; // MongoDB ObjectId
  name: string;
  email: string;
  image?: string; // Optional
}