"use server";

import { connectToDB } from "../mongoose";
import User from "../models/user.models";

export interface Params {
    name: string;
    email: string;
    image: string;
}

export async function updateUser({ name, email, image }: Params) {

    try{

        if(connectToDB) {
            await connectToDB();
        }

        const userDoc = await User.findOneAndUpdate(
            { email },
            { $setOnInsert: { email, name, image }},
            { new: true, upsert: true }
        ) 

        return userDoc;

    } catch(error: any) {
        throw new Error(`Failed to update user ${error.message}`)
    }
    
    
}