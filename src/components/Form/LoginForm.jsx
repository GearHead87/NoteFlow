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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
	email: z.string().email({
		message: "Invalid email address.",
	}),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
});

const LoginForm = () => {
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

	// 2. Define a submit handler.
	const onSubmit = async (values) => {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
		const res = await signIn("credentials", {
			email: values.email,
			password: values.password,
			redirect: false,
		});
		console.log(res);

		// Handle sign-in response
		if (res?.error) {
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
			// Show success notification and redirect to homepage
			toast("Login successful!", {
				icon: "✅",
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
				},
			});
			router.push("/"); // Redirect to homepage
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
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
};

export default LoginForm;
