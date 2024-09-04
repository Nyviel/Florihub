"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
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
		const res = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});
		if (!res || !res.ok) {
			setError("Failed to auth user");
			toast.error("Login Failed!");
		} else {
			router.replace("/");
			toast.success("Signed In Successfully!");
		}
	};
	return (
		<section className="min-h-screen w-full flex">
			<div className="w-full md:w-1/2 lg:w-1/4 flex justify-center items-start pt-12 ">
				<form
					onSubmit={(e) => {
						handleFormSubmit(e);
					}}
					className="mt-12 mx-6 p-6 h-fit space-y-8 bg-green-700 rounded-lg shadow shadow-green-950"
				>
					<h2 className="text-3xl text-center font-semibold mb-6 text-white">
						Login
					</h2>
					<hr />
					<div className="my-6 font-semibold text-center text-white">
						Log in with your email address
					</div>

					<div className="mb-4 space-y-4">
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Email address..."
							required
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							className="w-full p-2 px-4 rounded-md"
						/>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Password..."
							required
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							className="w-full p-2 px-4 rounded-md"
						/>
					</div>

					<div className="my-1">
						{error && (
							<p className="text-red-300 text-base font-medium">
								{"Error: " + error}
							</p>
						)}
					</div>

					<div className="flex flex-col justify-center items-center">
						<button
							className=" text-white bg-green-900 font-bold py-2 px-4 mb-2 rounded-full w-full focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Login
						</button>
						<Link
							href="/auth/register"
							className="text-white p-1 flex items-center underline font-light hover:text-primary-950"
						>
							Not a member yet? Register with us here!
							<FaArrowRight className="inline-block ml-2" />
						</Link>
					</div>
				</form>
			</div>
			<div className="hidden md:w-1/2 md:block lg:w-3/4 bg-[url('/images/login-thumbnail.webp')] bg-cover bg-center"></div>
		</section>
	);
};

export default LoginPage;
