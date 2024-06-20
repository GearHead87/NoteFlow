"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const TanstackQueryProvider = ({ children }) => {
	return (
		<div>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</div>
	);
};

export default TanstackQueryProvider;
