import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";
import { collectionNames } from "@/lib/auth";

export async function GET(req, { params }) { // prams must be destructured
  const { id } = await params; // then id can be accessed. Its the best practice to trigger params this way.
  const filter = { _id: new ObjectId(id) };
  const result = await dbConnect(collectionNames.CUSTOMER_DATA).findOne(filter);
  return Response.json(result);
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  const filter = { _id: new ObjectId(id) };
  const result = await dbConnect(collectionNames.CUSTOMER_DATA).deleteOne(filter);
  return Response.json(result);
}

export async function PATCH(req, { params }) {
  const updateCustomer = await req.json();
  const { id } = await params;
  const filter = { _id: new ObjectId(id) };
  const UpdateDoc = {
    $set: {
      ...updateCustomer,
    },
  };
  const result = await dbConnect(collectionNames.CUSTOMER_DATA).updateOne(filter, UpdateDoc);
  return Response.json(result);
}