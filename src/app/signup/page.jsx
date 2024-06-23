import SignupForm from "@/components/Form/SignupForm";
import Link from "next/link";

const signupPage = () => {
	return (
		<div>
			<SignupForm />
			<h6 className="my-12 text-center">
				Already Have Account?{" "}
				<Link className="text-primary font-semibold" href={"/login"}>
					Login
				</Link>
			</h6>
		</div>
	);
};

export default signupPage;
