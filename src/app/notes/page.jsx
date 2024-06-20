"use client";
import NoteAddForm from "@/components/Form/NoteAddForm";
import NoteCard from "@/components/Notes/NoteCard";
import getNotes from "@/services/getNotes";
import { useSession } from "next-auth/react";

const NotePage = () => {
	const { data: session, status: sessionStatus } = useSession();

	// Ensure the email is passed correctly to the getNotes function
	const { notes, isLoading, refetch } = getNotes(session?.user?.email);

	if (sessionStatus === "loading" || isLoading) {
		return <h2>Loading...</h2>;
	}

	return (
		<div className="container">
			<h2 className="text-3xl text-center my-10">Your Notes</h2>
			<div className="grid grid-cols-3 gap-4">
				<NoteAddForm refetch={refetch} />
				{notes.map((note) => (
					<NoteCard key={note.id} note={note} />
				))}
			</div>
		</div>
	);
};

export default NotePage;
