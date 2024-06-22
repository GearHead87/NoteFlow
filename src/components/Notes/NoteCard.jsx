import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MdOutlineMode, MdDeleteForever } from "react-icons/md";
import NoteEditForm from "../Form/NoteEditForm";
import { DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Meteors } from "../ui/meteors";

const NoteCard = ({ note, handleDelete, refetch }) => {
	const {
		_id,
		title,
		description,
		tags,
		createdAt,
		updatedAt,
		author,
		status,
		content,
	} = note;
	return (
		<div className="relative max-w-sm w-full">
			<Card className="bg-slate-800 relative overflow-hidden ">
				<Meteors number={20} className="absolute inset-0 z-0" />
				<CardHeader className="relative z-10">
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardContent className="relative z-10">
					<Textarea
						value={content}
						rows="10"
						placeholder="Type your message here."
					/>
				</CardContent>
				<CardFooter className="relative z-10 flex items-center justify-between">
					<div className="space-x-4">
						{tags.map((tag, index) => (
							<Badge key={index}>{tag}</Badge>
						))}
					</div>
					<div className="flex text-3xl">
						<NoteEditForm note={note} refetch={refetch} />
						<button onClick={() => handleDelete(_id)}>
							<MdDeleteForever className="text-red-400 hover:bg-slate-600 rounded-lg" />
						</button>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default NoteCard;
