"use client";

import DashboardHome from "@/components/dashboard/dashboardHome";
import DashboardPlants from "@/components/dashboard/dashboardPlants";
import DashboardUsers from "@/components/dashboard/dashboardUsers";
import { useEffect, useState } from "react";
import { FaLeaf, FaTable, FaUsers } from "react-icons/fa";

type DashboardView = "dashboard" | "users" | "plants";

const DashboardPage = () => {
	const [isMounted, setIsMounted] = useState(false);
	const [currentView, setCurrentView] = useState<DashboardView>("dashboard");

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<div className="h-full w-full flex text-white">
			<div className="w-1/6 p-5 bg-green-800 border-r border-white">
				<ul className="flex flex-col gap-3 text-lg" role="list">
					<li
						className="w-fit hover:cursor-pointer"
						onClick={() => {
							setCurrentView("dashboard");
						}}
					>
						<FaTable className="inline me-1" /> Dashboard
					</li>
					<li
						className="w-fit hover:cursor-pointer"
						onClick={() => {
							setCurrentView("users");
						}}
					>
						<FaUsers className="inline me-1 hover:cursor-pointer" />{" "}
						Users
					</li>
					<li
						className="w-fit hover:cursor-pointer"
						onClick={() => {
							setCurrentView("plants");
						}}
					>
						<FaLeaf className="inline me-1 hover:cursor-pointer" />{" "}
						Plants
					</li>
				</ul>
			</div>
			<div className="w-5/6 h-full">
				{currentView == "dashboard" && <DashboardHome />}
				{currentView == "users" && <DashboardUsers />}
				{currentView == "plants" && <DashboardPlants />}
			</div>
		</div>
	);
};
export default DashboardPage;
