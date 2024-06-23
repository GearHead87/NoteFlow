import LoginForm from "@/components/Form/LoginForm";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
	return (
		<div>
			<LoginForm />
			<h6 className="my-12 text-center">
				Not Have Account?{" "}
				<Link className="text-primary font-semibold" href={"/signup"}>
					Sign Up
				</Link>
			</h6>
		</div>
	);
};

export default LoginPage;
