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
		<div className="max-w-sm">
			<Card className="bg-slate-800">
				<CardHeader>
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardContent>
					<Textarea
						value={content}
						rows="10"
						placeholder="Type your message here."
					/>
				</CardContent>
				<CardFooter className="flex items-center justify-between">
					<div className="space-x-4">
						{tags.map((tag) => (
							<Badge className={""}>{tag}</Badge>
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
