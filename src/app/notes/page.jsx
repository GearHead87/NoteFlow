"use client";
import NoteAddForm from "@/components/Form/NoteAddForm";
import NoteCard from "@/components/Notes/NoteCard";
import useAxiosCommon from "@/hooks/useAxiosCommon";
import getNotes from "@/services/getNotes";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Loading from "../loading";

const NotePage = () => {
	const { data: session, status: sessionStatus } = useSession();
	const axiosCommon = useAxiosCommon();
	const { notes, isLoading, refetch } = getNotes(session?.user?.email);

	const handleDelete = async (id) => {
		const { data } = await axiosCommon.delete(`api/notes?id=${id}`);
		console.log(data);
		toast(`${data.message}`, {
			icon: "✅",
			style: {
				borderRadius: "10px",
				background: "#333",
				color: "#fff",
			},
		});
		refetch();
	};

	if (sessionStatus === "loading" || isLoading) {
		return <Loading />;
	}

	return (
		<div className="container">
			<h2 className="text-3xl text-center my-10">Your Notes</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 drama-slate-800 drama-10">
				<NoteAddForm refetch={refetch} />
				{notes.map((note) => (
					<NoteCard
						key={note._id}
						note={note}
						handleDelete={handleDelete}
						refetch={refetch}
					/>
				))}
			</div>
		</div>
	);
};

export default NotePage;
