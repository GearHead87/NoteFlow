import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
	const noteData = await request.json();
	const newNoteData = {
		...noteData,
		createdAt: new Date(),
		updatedAt: new Date(),
		status: "active",
	};
	console.log(newNoteData);
	try {
		const db = await connectDB();
		const notesCollection = db.collection("notes");
		const result = await notesCollection.insertOne(noteData);
		return NextResponse.json({ message: "Note Saved" }, { status: 201 });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: "Something Went Wrong", error },
			{ status: 500 }
		);
	}
};

export const GET = async (request) => {
	return NextResponse.json({ message: "note routes" });
};
