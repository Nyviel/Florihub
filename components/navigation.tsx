"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navigation = () => {
	const { data: session } = useSession();
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		if (session && session.user) {
			setIsAuthenticated(true);
		}
	}, [session]);
	return (
		<header>
			<div className="w-full flex items-center bg-green-950 p-5">
				<a href="/" className="text-3xl">
					<span className="text-green-400">Flori</span>
					<span className="text-white font-bold">Hub</span>
				</a>
				<nav className="flex-1">
					<ul
						role="list"
						className="hidden md:flex md:flex-row items-center justify-end gap-5 text-white"
					>
						<Link href="/explore" className="hover:cursor-pointer">
							Explore
						</Link>
						<Link href="/about" className="hover:cursor-pointer">
							About
						</Link>
						<Link href="/contact" className="hover:cursor-pointer">
							Contact
						</Link>
						{isAuthenticated ? (
							<>
								<Link
									href="/profile"
									className="hover:cursor-pointer"
								>
									Profile
								</Link>
								<Link
									href="#"
									onClick={() => {
										setIsAuthenticated(false);
										signOut();
									}}
									className="hover:cursor-pointer"
								>
									Logout
								</Link>
							</>
						) : (
							<>
								<Link
									href="/auth/login"
									className="hover:cursor-pointer"
								>
									Login
								</Link>
								<Link
									href="/auth/register"
									className="hover:cursor-pointer"
								>
									Register
								</Link>
							</>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
};
export default Navigation;
