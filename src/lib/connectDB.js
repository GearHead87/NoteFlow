import { MongoClient, ServerApiVersion } from "mongodb";
let db;
export const connectDB = async () => {
	if (db) return db;
	try {
		const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
		const client = new MongoClient(uri, {
			serverApi: {
				version: ServerApiVersion.v1,
				strict: true,
				deprecationErrors: true,
			},
		});
		await client.connect();
		db = client.db("NoteFlowDB");
		console.log("Successfully connected to MongoDB");
		return db;
	} catch (error) {
		console.error("Failed to connect to the database", error);
		console.log({ error });
	}
};
