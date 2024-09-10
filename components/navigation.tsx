"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
const Navigation = () => {
	const { data: session } = useSession();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		if (session && session.user) {
			setIsAuthenticated(true);
			if (session.user.isAdmin) {
				setIsAdmin(true);
			}
		}
	}, [session]);

	return (
		<header className="absolute w-full">
			<div className="w-full flex items-center bg-gray-950 p-5">
				<a href="/" className="text-3xl">
					<span className="text-green-400">Flori</span>
					<span className="text-white font-bold">Hub</span>
				</a>
				<nav className="relative flex-1">
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<button
								type="button"
								id="mobile-dropdown-button"
								className="block md:hidden absolute right-0 top-0 -translate-y-1/2 rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
								onClick={() => setIsOpen(true)}
							>
								<span className="sr-only">Open main menu</span>
								<svg
									className="block h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
									/>
								</svg>
							</button>
						</SheetTrigger>
						<SheetContent className="bg-green-900 text-white">
							<SheetHeader>
								<SheetTitle className="py-5 text-left text-white">
									Navigation
								</SheetTitle>
							</SheetHeader>
							<Separator />
							<div className="flex flex-col gap-y-3 px-2 py-5">
								<Link
									href="/"
									className="hover:cursor-pointer"
									onClick={() => setIsOpen(false)}
								>
									Home
								</Link>
								<Link
									href="/explore"
									className="hover:cursor-pointer"
									onClick={() => setIsOpen(false)}
								>
									Explore
								</Link>
								<Link
									href="/about"
									className="hover:cursor-pointer"
									onClick={() => setIsOpen(false)}
								>
									About
								</Link>
								<Link
									href="/contact"
									className="hover:cursor-pointer"
									onClick={() => setIsOpen(false)}
								>
									Contact
								</Link>
								{isAdmin && (
									<>
										<Link
											href="/dashboard"
											className="hover:cursor-pointer"
											onClick={() => setIsOpen(false)}
										>
											Dashboard
										</Link>
									</>
								)}
							</div>
							<Separator />
							<SheetFooter>
								<div className="flex flex-col gap-y-3 px-2 py-5">
									{isAuthenticated ? (
										<>
											<Link
												href="#"
												onClick={() => {
													setIsOpen(false);
													setIsAuthenticated(false);
													signOut();
												}}
												className="hover:cursor-pointer"
											>
												Logout
											</Link>
											<Link
												href="/profile"
												className="hover:cursor-pointer"
												onClick={() => setIsOpen(false)}
											>
												Profile
											</Link>
										</>
									) : (
										<>
											<Link
												href="/auth/login"
												className="hover:cursor-pointer"
												onClick={() => setIsOpen(false)}
											>
												Login
											</Link>
											<Link
												href="/auth/register"
												className="hover:cursor-pointer"
												onClick={() => setIsOpen(false)}
											>
												Register
											</Link>
										</>
									)}
								</div>
							</SheetFooter>
						</SheetContent>
					</Sheet>

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
						{isAdmin && (
							<>
								<Link
									href="/dashboard"
									className="hover:cursor-pointer"
								>
									Dashboard
								</Link>
							</>
						)}
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
