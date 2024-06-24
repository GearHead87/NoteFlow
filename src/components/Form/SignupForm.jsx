"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAxiosCommon from "@/hooks/useAxiosCommon";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../ui/loadingSpinner";
import { useState } from "react";

const formSchema = z.object({
	email: z.string().email({
		message: "Invalid email address.",
	}),
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
});

const SignupForm = () => {
	const axiosCommon = useAxiosCommon();
	const router = useRouter(); // Initialize useRouter
	const [loading, setLoading] = useState(false);
	// 1. Define your form.
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			username: "",
			password: "",
		},
	});
	// 2. Define a submit handler.
	const onSubmit = async (values) => {
		setLoading(true);
		try {
			// Do something with the form values.
			// ✅ This will be type-safe and validated.
			const userData = {
				email: values.email,
				userName: values.username,
				password: values.password,
			};
			const { data, status } = await axiosCommon.post("api/signup", userData);
			console.log("Response:", data, status);

			// Displaying a success toast notification
			toast(`${data.message}`, {
				icon: "✅",
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
				},
			});
			setLoading(false);
			// Redirecting to the callback URL
			if (status === 201) {
				router.push(data.redirectUrl);
			}
		} catch (error) {
			setLoading(false);
			const errorMessage =
				error.response?.data?.message || "Something went wrong!";
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
		<div>
			{" "}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4 mt-10 max-w-lg mx-auto"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="Email Address" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder="User Name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="Password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{loading ? (
						<>
							<Button className="font-semibold opacity-60">
								<LoadingSpinner color="black" /> Processing...
							</Button>
						</>
					) : (
						<>
							<Button type="submit" disable className="font-semibold">
								Sign Up
							</Button>
						</>
					)}
				</form>
			</Form>
		</div>
	);
};

export default SignupForm;
