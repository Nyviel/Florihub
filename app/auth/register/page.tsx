"use client";

import { postUser } from "@/services/userService";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

const RegisterPage = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();
	const { data: session } = useSession();

	useEffect(() => {
		if (session && session.user) {
			router.replace("/");
		}
	}, [session]);

	const handleFormSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!email || !name || !password || !repeatPassword) {
			setError("Form fields can't be empty");
			return;
		}

		if (password !== repeatPassword) {
			setError("Passwords don't match");
			return;
		}

		const res = await postUser({ name, email, password });
		if (!res) {
			setError("Failed to create an account");
			toast.error("Account Creation Failed!");
		} else {
			router.replace("/auth/login");
			toast.success("New Account Created Successfully!");
		}
	};
	return (
		<section className="min-h-screen w-full flex">
			<div className="w-full sm:w-1/2 xl:w-1/3 h-full flex justify-center items-start pt-12 bg-green-900 order-2">
				<form
					onSubmit={(e) => {
						handleFormSubmit(e);
					}}
					className="p-8 m-4 rounded-lg bg-green-700 min-h-3/4 h-fit  text-center shadow shadow-green-950"
				>
					<h2 className="text-3xl text-center font-semibold mb-6 text-white">
						Create An Account
					</h2>
					<hr />
					<div className="my-6 font-semibold text-center text-white">
						Register with your email address
					</div>
					<div className="mb-4">
						<input
							type="text"
							name="name"
							placeholder="User Name..."
							required
							onChange={(e) => {
								setName(e.target.value);
							}}
							className="w-full p-2 px-4 rounded-md"
						/>
					</div>

					<div className="mb-4">
						<input
							type="email"
							name="email"
							placeholder="Email address..."
							required
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							className="w-full p-2 px-4 rounded-md"
						/>
					</div>

					<div className="mb-4">
						<input
							type="password"
							name="password"
							placeholder="Password..."
							required
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							className="w-full p-2 px-4 rounded-md"
						/>
					</div>

					<div className="mb-4">
						<input
							type="password"
							name="repeatPassword"
							placeholder="Repeat Password..."
							required
							onChange={(e) => {
								setRepeatPassword(e.target.value);
							}}
							className="w-full p-2 px-4 rounded-md"
						/>
					</div>
					<div className="my-1">
						{error && (
							<p className="text-red-500 text-base font-medium">
								{"Error: " + error}
							</p>
						)}
					</div>
					<div>
						<button
							className="text-white bg-green-900 font-bold py-2 px-4 mt-5 mb-2 rounded-full w-full focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Register
						</button>
						<Link
							href="/auth/login"
							className="p-1 flex items-center underline font-light text-white"
						>
							Already have an account? Proceed to the login page
							<FaArrowRight className="inline-block ml-2" />
						</Link>
					</div>
				</form>
			</div>
			<div className="sm:w-1/2 xl:w-2/3 min-h-full bg-[url('/images/register-thumbnail.webp')] bg-cover bg-center order-1"></div>
		</section>
	);
};

export default RegisterPage;
