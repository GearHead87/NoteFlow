import useAxiosCommon from "@/hooks/useAxiosCommon";

const axiosCommon = useAxiosCommon();
export const getNotes = async (email) => {
	const { data } = await axiosCommon.get(`/api/notes/${email}`);
	// console.log(data.notes);
	return data.notes;
};
