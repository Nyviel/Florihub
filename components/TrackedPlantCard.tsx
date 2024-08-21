"use client";
import { TrackedPlant } from "@/interfaces/trackedPlant";
import { useRouter } from "next/navigation";

const TrackedPlantCard = ({ plant }: { plant: TrackedPlant }) => {
	const router = useRouter();
	const handleButtonClick = () => {
		router.push(`/trackedplants?tpid=${plant._id}`);
	};
	return (
		<div className="w-full h-fit max-h-full bg-gray-900 rounded-lg space-y-4 border border-gray-950 shadow-md shadow-black">
			<div className="w-full h-[200px] md:h-[400px] overflow-hidden">
				<img
					src={`/images/${plant.thumbnail}`}
					alt="Plant thumbnail"
					className="w-full h-full object-cover object-center border rounded-t-lg border-gray-950"
				/>
			</div>
			<div className="w-full flex flex-col justify-center items-center">
				<h1 className="text-2xl text-white">{plant.name}</h1>
			</div>

			<div className="text-center p-6">
				<button
					className="px-8 py-4 text-lg bg-green-700 rounded-lg"
					onClick={handleButtonClick}
				>
					Details
				</button>
			</div>
		</div>
	);
};
export default TrackedPlantCard;
