import { Plant } from "@/interfaces/plant";
import PlantCard from "./PlantCard";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const PlantCards = ({ plants }: { plants: Plant[] }) => {
	useEffect(() => {
		console.log(plants);
	}, [plants]);
	return (
		<section
			className={cn(
				"h-full w-full grid grid-cols-1 gap-4",
				plants.length <= 1
					? "md:grid-cols-1"
					: plants.length <= 2
					? "md:grid-cols-2"
					: "md:grid-cols-3"
			)}
		>
			{plants.length ? (
				plants?.map((plant) => {
					return <PlantCard key={plant._id} plant={plant} />;
				})
			) : (
				<h2 className="text-2xl text-center">No results found</h2>
			)}
		</section>
	);
};
export default PlantCards;
