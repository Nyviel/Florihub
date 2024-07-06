"use client";

import { useEffect, useState } from "react";
import { columns } from "../columns/userColumns";
import { DataTable } from "../DataTable";
import { toast } from "react-toastify";
import { fetchUsers } from "@/services/userService";
import { User } from "@/interfaces/user";

const DashboardUsers = () => {
	const [data, setData] = useState<User[]>([]);
	useEffect(() => {
		const populateData = async () => {
			const users = await fetchUsers();
			if (!users) {
				toast.error("Failed fetching users");
			} else {
				setData(users);
			}
		};
		populateData();
	}, []);
	return (
		<div className="w-full h-full bg-green-900 p-5">
			<DataTable columns={columns} data={data} />
		</div>
	);
};
export default DashboardUsers;
