"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "@/hooks/useAxiosCommon";

const useNotes = (email) => {
	const axiosCommon = useAxiosCommon();

	const { data: notes, isLoading, refetch } = useQuery({
		queryKey: ["usernotes", email],
		enabled: !!email, // Ensure the query is only enabled if email is provided
		queryFn: async () => {
			const { data } = await axiosCommon.get(`/api/notes/${email}`);
			return data.notes;
		},
	});

	return { notes, isLoading, refetch };
};

export default useNotes;
