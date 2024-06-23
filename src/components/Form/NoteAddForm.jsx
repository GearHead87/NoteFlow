"use client";
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
import {
	MdOutlineMode,
	MdDeleteForever,
	MdOutlineLoop,
	MdOutlineSave,
} from "react-icons/md";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosCommon from "@/hooks/useAxiosCommon";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Meteors } from "../ui/meteors";

const options = [
	{ value: "work", label: "Work" },
	{ value: "personal", label: "Personal" },
	{ value: "urgent", label: "Urgent" },
	{ value: "shopping", label: "Shopping" },
	{ value: "ideas", label: "Ideas" },
	{ value: "other", label: "Other" },
];

const NoteAddForm = ({ refetch }) => {
	const [selectedTags, setSelectedTags] = useState([]);
	const { data: currentUser, status } = useSession();
	const handleTagsChange = (selectedOptions) => {
		setSelectedTags(selectedOptions);
	};
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm();
	const axiosCommon = useAxiosCommon();

	const onSubmit = async (data) => {
		const noteData = {
			title: data.title,
			description: data.description,
			content: data.content,
			author: currentUser?.user?.email,
			tags: selectedTags.map((tag) => tag.value),
		};
		console.log(noteData);
		try {
			const { data, status } = await axiosCommon.post("/api/notes", noteData);
			toast(`${data.message}`, {
				icon: "✅",
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
				},
			});
			refetch();
			reset();
			setSelectedTags([]);
		} catch (error) {
			console.log(error);
			toast(`${errorMessage}`, {
				icon: "❌",
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
				},
			});
		}
	};

	return (
		<div className="relative max-w-sm w-full">
			<Card className="bg-slate-800 relative overflow-hidden">
				<Meteors number={20} className="absolute inset-0 z-0" />
				<form onSubmit={handleSubmit(onSubmit)}>
					<CardHeader className="relative z-10">
						<CardTitle>
							<Label htmlFor="Title">Title</Label>
							<Input {...register("title")} required />
						</CardTitle>
						<CardDescription>
							<Label htmlFor="Description">Description</Label>
							<Input {...register("description")} required />
						</CardDescription>
					</CardHeader>
					<CardContent className="relative z-10">
						<Textarea
							rows="10"
							placeholder="Type your notes here."
							{...register("content")}
							required
						/>
					</CardContent>
					<CardFooter className="relative z-10 flex items-center justify-between">
						<div className="space-x-4 w-full">
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
								required
								menuPortalTarget={document.body} // Render menu in a separate DOM node
								styles={{
									menuPortal: (base) => ({
										...base,
										color: "black",
										zIndex: 9999,
									}),
								}} // Ensure it is above other elements
							/>
						</div>
						<div className="flex text-3xl">
							<button type="submit">
								<MdOutlineSave className="text-blue-400 hover:bg-slate-600 rounded-lg mx-4" />
							</button>
							<div
								onClick={() => {
									reset();
									setSelectedTags([]);
								}}
							>
								<MdOutlineLoop className="text-red-400 hover:bg-slate-600 rounded-lg" />
							</div>
						</div>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
};

export default NoteAddForm;
