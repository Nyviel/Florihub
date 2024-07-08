import DashboardStats from "@/components/dashboard/dashboardStats";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const DashboardHome = () => {
	const { data: session } = useSession();
	const router = useRouter();
	// useEffect(() => {
	// 	if (!session || !session.user || !session.user.isAdmin) {
	// 		router.replace("/");
	// 	}
	// }, [session]);

	const data = [
		{
			month: "January",
			users: "54",
		},
		{
			month: "February",
			users: "32",
		},
		{
			month: "March",
			users: "66",
		},
		{
			month: "April",
			users: "91",
		},
		{
			month: "May",
			users: "54",
		},
		{
			month: "June",
			users: "32",
		},
		{
			month: "July",
			users: "66",
		},
		{
			month: "August",
			users: "91",
		},
		{
			month: "September",
			users: "54",
		},
		{
			month: "October",
			users: "32",
		},
		{
			month: "November",
			users: "66",
		},
		{
			month: "December",
			users: "91",
		},
	];
	return (
		<div className="w-full h-screen flex flex-col bg-green-900">
			<DashboardStats />
			<hr className="mx-10"></hr>
			<div className="flex-1 h-full flex flex-col justify-start items-center mt-5">
				<h2 className="text-3xl p-10">Users in 2023</h2>
				<ResponsiveContainer width="95%" height={400}>
					<BarChart data={data}>
						<XAxis dataKey="month" tick={{ fill: "#FFFFFF" }} />
						<YAxis tick={{ fill: "#FFFFFF" }} />
						<Tooltip />
						<Bar dataKey="users" fill="#82ca9d" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};
export default DashboardHome;
