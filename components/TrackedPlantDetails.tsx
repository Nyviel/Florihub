"use client";
import { TrackedPlant } from "@/interfaces/trackedPlant";
import Timeline from "./Timeline";

const TrackedPlantDetails = ({
	plant,
}: {
	plant: TrackedPlant | undefined;
}) => {
	return (
		<section className="container mx-auto max-h-fit min-h-screen  text-white">
			<div className="w-full py-32 ml-2 relative">
				<h1 className="text-3xl pb-10 font-semibold text-center ">
					Timeline of your {plant?.name}
				</h1>
				<Timeline plant={plant} />
			</div>
		</section>
	);
};
export default TrackedPlantDetails;
