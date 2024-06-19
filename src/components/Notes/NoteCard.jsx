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

const NoteCard = ({ note }) => {
	const {
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
						<MdOutlineMode className="text-blue-400 hover:bg-slate-600 rounded-lg mr-4" />
						<MdDeleteForever className="text-red-400 hover:bg-slate-600 rounded-lg" />
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default NoteCard;
