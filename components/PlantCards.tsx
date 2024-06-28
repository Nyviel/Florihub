import { Plant } from "@/interfaces/plant";
import PlantCard from "./PlantCard";
import { useEffect } from "react";

const PlantCards = ({ plants }: { plants: Plant[] }) => {
	useEffect(() => {
		console.log(plants);
	}, [plants]);
	return (
		<div className="h-full w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
			{plants?.map((plant) => {
				return <PlantCard key={plant._id} plant={plant} />;
			})}
		</div>
	);
};
export default PlantCards;
