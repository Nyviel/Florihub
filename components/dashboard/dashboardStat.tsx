import { IconType } from "react-icons";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
interface DashboardStatProps {
	Icon: IconType;
	title: string;
	content: string;
}

const DashboardStat = ({ Icon, title, content }: DashboardStatProps) => {
	return (
		<Card className="w-64 p-6 rounded-lg bg-green-950 text-white text-center">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>
					<Icon className="mx-auto text-white mt-2 text-xl" />
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p>{content}</p>
			</CardContent>
		</Card>
	);
};
export default DashboardStat;
