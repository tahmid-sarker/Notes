"use server";
import { collectionNames } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";

export const postProducts = async(data) => {
  try {
    const result = await dbConnect(collectionNames.PRODUCT_DATA).insertOne(data);
    revalidatePath('/products');
    return result;
  } catch (error) {
    console.log("Error posting product:", error);
    return null;
  }
}