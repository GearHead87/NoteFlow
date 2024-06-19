import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import Navbar from "@/components/shared/Navbar";
import AuthProvider from "@/services/AuthProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "NoteFlow",
	description:
		"Your seamless solution for organized and efficient note-taking.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<AuthProvider>
						<Toaster position="top-right" reverseOrder={false} />
						<Navbar />
						{children}
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
