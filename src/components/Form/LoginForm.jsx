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
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import LoadingSpinner from "../ui/loadingSpinner";

const formSchema = z.object({
	email: z.string().email({
		message: "Invalid email address.",
	}),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
});

const LoginForm = () => {
	const [loading, setLoading] = useState(false);
	// 1. Define your form.
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// Initialize useRouter
	const router = useRouter();
	const searchParams = useSearchParams();
	const path = searchParams.get("redirect");

	// 2. Define a submit handler.
	const onSubmit = async (values) => {
		setLoading(true);
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
		const res = await signIn("credentials", {
			email: values.email,
			password: values.password,
			redirect: true,
			callbackUrl: path ? path : "/",
		});
		console.log(res);

		// Handle sign-in response
		if (!res?.ok) {
			setLoading(false);
			// Show error notification
			toast(res.error, {
				icon: "❌",
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
				},
			});
		} else {
			setLoading(false);
			// Show success notification and redirect to homepage
			toast("Login successful!", {
				icon: "✅",
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
				},
			});
			// router.push("/"); // Redirect to homepage
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
								Login
							</Button>
						</>
					)}
				</form>
			</Form>
		</div>
	);
};

export default LoginForm;
