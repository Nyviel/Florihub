import { columns } from "../columns/userColumns";
import { DataTable } from "../DataTable";
import userData from "@/stubuserdata.json";

const DashboardUsers = () => {
	const data = userData;
	return (
		<div className="w-full h-full bg-green-900 p-5">
			<DataTable columns={columns} data={data} />
		</div>
	);
};
export default DashboardUsers;
