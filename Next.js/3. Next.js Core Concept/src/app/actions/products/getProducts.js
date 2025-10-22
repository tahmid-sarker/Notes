"use server";
import { collectionNames } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";

export const getProducts = async() => {
  try {
    const result = await dbConnect(collectionNames.PRODUCT_DATA).find({}).toArray();
    return result;
  } catch (error) {
    console.log("Error fetching products:", error);
    return [];
  }
}