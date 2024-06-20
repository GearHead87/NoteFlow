"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { MdOutlineMode } from "react-icons/md";
import { Textarea } from "../ui/textarea";
import CreatableSelect from "react-select/creatable";
import { useEffect, useState } from "react";
import useAxiosCommon from "@/hooks/useAxiosCommon";
import toast from "react-hot-toast";

const options = [
	{ value: "work", label: "Work" },
	{ value: "personal", label: "Personal" },
	{ value: "urgent", label: "Urgent" },
	{ value: "shopping", label: "Shopping" },
	{ value: "ideas", label: "Ideas" },
	{ value: "other", label: "Other" },
];

const NoteEditForm = ({ note, refetch }) => {
	const [selectedTags, setSelectedTags] = useState([]);
	const handleTagsChange = (selectedOptions) => {
		setSelectedTags(selectedOptions);
	};
	useEffect(() => {
		const currentSelectedTags = note.tags.map((tag) => ({
			label: tag,
			value: tag,
		}));
		setSelectedTags(currentSelectedTags);
	}, [note.tag]);
	const axiosCommon = useAxiosCommon();
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		// console.log(data);
		const updatedNoteData = {
			title: data.title,
			description: data.description,
			content: data.content,
			tags: selectedTags.map((tag) => tag.value),
		};
		console.log(updatedNoteData);
		try {
			const { data: result } = await axiosCommon.patch(
				`/api/notes/?id=${note._id}`,
				updatedNoteData
			);
			toast(`${result.message}`, {
				icon: "✅",
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
				},
			});
			refetch();
			console.log(result);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<Dialog>
				<DialogTrigger asChild>
					{/* <Button variant="outline">Edit Profile</Button> */}
					<MdOutlineMode className="text-blue-400 hover:bg-slate-600 rounded-lg mr-4" />
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Edit Note</DialogTitle>
						<DialogDescription>
							Make changes to your notes here. Click save when you're done.
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div>
							<Label htmlFor="Title">Title</Label>
							<Input {...register("title")} defaultValue={note.title} />
						</div>
						<div>
							<Label htmlFor="Description">Description</Label>
							<Input
								{...register("description")}
								defaultValue={note.description}
							/>
						</div>
						<div>
							<Textarea
								rows="8"
								placeholder="Type your notes here."
								{...register("content")}
								defaultValue={note.content}
							/>
						</div>
						<div>
							{/* Add select field for tags */}
							<CreatableSelect
								isMulti
								name="tags"
								options={options}
								className="basic-multi-select text-sm text-black rounded-lg"
								classNamePrefix="select"
								value={selectedTags}
								onChange={handleTagsChange}
								placeholder="Select Tags"
							/>
						</div>
						<DialogFooter>
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default NoteEditForm;
