import { FaLeaf, FaUser, FaUsers } from "react-icons/fa";
import DashboardStat from "./dashboardStat";

const DashboardStats = () => {
	return (
		<div className="w-full h-1/3 flex justify-center gap-10 p-10">
			<DashboardStat Icon={FaUser} title={"Total Users"} content={"0"} />
			<DashboardStat Icon={FaLeaf} title={"Total Plants"} content={"0"} />
			<DashboardStat Icon={FaUsers} title={"New Users"} content={"0"} />
		</div>
	);
};
export default DashboardStats;
