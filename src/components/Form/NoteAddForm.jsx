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
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const NoteAddForm = () => {
	return (
		<div className="max-w-sm">
			<Card className="bg-slate-800">
				<CardHeader>
					<CardTitle>
						<Label htmlFor="Title">Title</Label>
						<Input />
					</CardTitle>
					<CardDescription>
						<Label htmlFor="Description">Description</Label>
						<Input />
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Textarea rows="10" placeholder="Type your message here." />
				</CardContent>
				<CardFooter className="flex items-center justify-between">
					<div className="space-x-4">
                    {/* Add select field for tags */}
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

export default NoteAddForm;
