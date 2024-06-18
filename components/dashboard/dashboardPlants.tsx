import { columns } from "../columns/plantColumns";
import { DataTable } from "../dataTable";
import plantData from "@/stubplantsdata.json";

const DashboardPlants = () => {
	const data = plantData;
	return (
		<div className="w-full h-full  bg-green-900 p-5">
			<DataTable columns={columns} data={data} />
		</div>
	);
};
export default DashboardPlants;
