import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    console.log(params);
	try {
		const db = await connectDB();
		const notesCollection = db.collection("notes");
		const notes = await notesCollection.find({ author: params.email }).toArray();
		return NextResponse.json({ notes });
	} catch (error) {
		return NextResponse.json(
			{ message: "Something Went Wrong", error },
			{ status: 500 }
		);
	}
};
