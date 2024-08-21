import { useEffect } from "react";
import { TrackedPlant } from "@/interfaces/trackedPlant";
import TrackedPlantCard from "./TrackedPlantCard";
import { cn } from "@/lib/utils";

const TrackedPlantCards = ({ plants }: { plants: TrackedPlant[] }) => {
	useEffect(() => {
		console.log(plants);
	}, [plants]);
	return (
		<div
			className={cn(
				"h-full w-full grid grid-cols-1 gap-4",
				plants.length <= 1
					? "md:grid-cols-1"
					: plants.length <= 2
					? "md:grid-cols-2"
					: "md:grid-cols-3"
			)}
		>
			{plants?.map((plant) => {
				return <TrackedPlantCard key={plant._id} plant={plant} />;
			})}
		</div>
	);
};
export default TrackedPlantCards;
