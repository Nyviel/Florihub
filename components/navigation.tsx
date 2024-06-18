"use client";

import Link from "next/link";

const Navigation = () => {
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
						<Link href="/login" className="hover:cursor-pointer">
							Login
						</Link>
						<Link href="/register" className="hover:cursor-pointer">
							Register
						</Link>
					</ul>
				</nav>
			</div>
		</header>
	);
};
export default Navigation;
