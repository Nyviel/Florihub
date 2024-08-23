"use client";

import { useEffect, useState } from "react";
import { columns } from "../columns/plantColumns";
import { DataTable } from "../DataTable";
import { Plant } from "@/interfaces/plant";
import { fetchPlants } from "@/services/plantService";
import { toast } from "react-toastify";

const DashboardPlants = () => {
	const [data, setData] = useState<Plant[]>([]);
	useEffect(() => {
		const populateData = async () => {
			const res = await fetchPlants("");
			if (res) {
				setData(
					res.plants.map((plant) => ({
						...plant,
						description:
							plant.description.substring(0, 200) + "...",
					}))
				);
			} else {
				toast.error("Failed fetching plants");
			}
		};
		populateData();
	}, []);
	return (
		<div className="w-full h-screen bg-green-900 p-5">
			<DataTable columns={columns} data={data} />
		</div>
	);
};
export default DashboardPlants;
