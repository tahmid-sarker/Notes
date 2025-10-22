import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/dbConnect";
import { collectionNames } from "@/lib/auth";

// Get all data from a database
export async function GET() {
  const result = await dbConnect(collectionNames.CUSTOMER_DATA).find({}).toArray();
  return Response.json(result);
}

// Post data to a database
export async function POST(req) {
  const newCustomer = await req.json();
  const result = await dbConnect(collectionNames.CUSTOMER_DATA).insertOne(newCustomer);
  revalidatePath('/customers');
  return Response.json(result);
}