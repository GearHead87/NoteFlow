import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const POST = async (request) => {
	const noteData = await request.json();
	const newNoteData = {
		...noteData,
		createdAt: new Date(),
		updatedAt: new Date(),
		status: "active",
	};
	// console.log(newNoteData);
	try {
		const db = await connectDB();
		const notesCollection = db.collection("notes");
		const result = await notesCollection.insertOne(noteData);
		return NextResponse.json({ message: "Note Saved" }, { status: 201 });
	} catch (error) {
		// console.log(error);
		return NextResponse.json(
			{ message: "Something Went Wrong", error },
			{ status: 500 }
		);
	}
};

export const PATCH = async (request) => {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");
	const noteData = await request.json();
	const newNoteData = {
		...noteData,
		updatedAt: new Date(),
	};
	// console.log(id, newNoteData);
	try {
		const db = await connectDB();
		const notesCollection = db.collection("notes");
		const query = {
			_id: new ObjectId(id),
		};
		const updateDoc = {
			$set: {
				...newNoteData,
			},
		};
		const result = await notesCollection.updateOne(query, updateDoc);
		return NextResponse.json({ message: "Notes Updated", result });
	} catch (error) {
		return NextResponse.json(
			{ message: "Something Went Wrong", error },
			{ status: 500 }
		);
	}
};

export const DELETE = async (request) => {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");
	// console.log(id);
	try {
		const db = await connectDB();
		const notesCollection = db.collection("notes");
		const query = {
			_id: new ObjectId(id),
		};
		const result = await notesCollection.deleteOne(query);
		return NextResponse.json({ message: "Note deleted", result });
	} catch (error) {
		return NextResponse.json(
			{ message: "Something Went Wrong", error },
			{ status: 500 }
		);
	}
};
