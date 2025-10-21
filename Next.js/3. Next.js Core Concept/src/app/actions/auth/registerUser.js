"use server";

import dbConnect from "@/lib/dbConnect";
import { collectionNames } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const registerUser = async (payload) => {
    try {
        const result = await dbConnect(collectionNames.CUSTOMER_DATA).insertOne(payload);
        revalidatePath('/customers');
        return result;
    } catch (error) {
        console.log(error)
        return null
    }

}