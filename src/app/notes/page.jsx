import NoteAddForm from "@/components/Form/NoteAddForm";
import NoteCard from "@/components/Notes/NoteCard";
import React from "react";

const notes = [
	{
		title: "Grocery List",
		description: "Items to buy at the store",
		tags: ["shopping", "groceries"],
		createdAt: new Date("2023-06-01T10:00:00Z"),
		updatedAt: new Date("2023-06-01T10:00:00Z"),
		author: "John Doe",
		status: "active",
		content: "Milk, Bread, Eggs, Butter",
	},
	{
		title: "Project Plan",
		description: "Outline for the new project",
		tags: ["work", "project"],
		createdAt: new Date("2023-05-15T12:30:00Z"),
		updatedAt: new Date("2023-06-05T14:00:00Z"),
		author: "Jane Smith",
		status: "active",
		content: "1. Research\n2. Design\n3. Implementation\n4. Testing",
	},
	{
		title: "Meeting Notes",
		description: "Notes from the team meeting",
		tags: ["work", "meeting"],
		createdAt: new Date("2023-06-10T09:00:00Z"),
		updatedAt: new Date("2023-06-10T11:00:00Z"),
		author: "Alice Johnson",
		status: "completed",
		content: "Discussed project timeline, assigned tasks, and set deadlines.",
	},
	{
		title: "Vacation Ideas",
		description: "Places to visit on vacation",
		tags: ["personal", "vacation"],
		createdAt: new Date("2023-04-20T15:00:00Z"),
		updatedAt: new Date("2023-04-25T16:00:00Z"),
		author: "Bob Brown",
		status: "archived",
		content: "1. Hawaii\n2. Japan\n3. Italy",
	},
	{
		title: "Book Recommendations",
		description: "Books to read",
		tags: ["personal", "books"],
		createdAt: new Date("2023-03-12T08:00:00Z"),
		updatedAt: new Date("2023-06-01T18:00:00Z"),
		author: "Carol White",
		status: "active",
		content:
			"1. 'The Great Gatsby' by F. Scott Fitzgerald\n2. '1984' by George Orwell",
	},
	{
		title: "Workout Routine",
		description: "Weekly workout plan",
		tags: ["health", "fitness"],
		createdAt: new Date("2023-06-05T07:00:00Z"),
		updatedAt: new Date("2023-06-18T07:00:00Z"),
		author: "David Green",
		status: "active",
		content:
			"Monday: Chest\nTuesday: Back\nWednesday: Legs\nThursday: Arms\nFriday: Shoulders",
	},
	{
		title: "Recipe Collection",
		description: "Favorite recipes",
		tags: ["food", "recipes"],
		createdAt: new Date("2023-02-15T11:00:00Z"),
		updatedAt: new Date("2023-05-20T12:00:00Z"),
		author: "Eve Black",
		status: "active",
		content: "1. Spaghetti Bolognese\n2. Chicken Curry\n3. Chocolate Cake",
	},
	{
		title: "Learning Goals",
		description: "Skills to learn this year",
		tags: ["personal", "goals"],
		createdAt: new Date("2023-01-01T00:00:00Z"),
		updatedAt: new Date("2023-06-19T00:00:00Z"),
		author: "Frank Blue",
		status: "active",
		content:
			"1. Learn Spanish\n2. Improve coding skills\n3. Practice public speaking",
	},
	{
		title: "Movie Watchlist",
		description: "Movies to watch",
		tags: ["entertainment", "movies"],
		createdAt: new Date("2023-05-10T19:00:00Z"),
		updatedAt: new Date("2023-06-01T20:00:00Z"),
		author: "Grace Yellow",
		status: "active",
		content: "1. Inception\n2. The Matrix\n3. Interstellar",
	},
	{
		title: "Birthday Party Plan",
		description: "Plan for the birthday party",
		tags: ["personal", "events"],
		createdAt: new Date("2023-03-20T13:00:00Z"),
		updatedAt: new Date("2023-03-25T14:00:00Z"),
		author: "Hank Purple",
		status: "archived",
		content:
			"1. Send invitations\n2. Order cake\n3. Decorate the venue\n4. Plan games and activities",
	},
];

const NotePage = () => {
	return (
		<div className="container">
			<h2 className="text-3xl text-center my-10">Your Notes</h2>
			<div className="grid grid-cols-3 gap-4">
				<NoteAddForm />
				{notes.map((note) => (
					<NoteCard key={note.id} note={note} />
				))}
			</div>
		</div>
	);
};

export default NotePage;
