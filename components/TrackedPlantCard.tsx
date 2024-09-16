"use client";
import { TrackedPlant } from "@/interfaces/trackedPlant";
import { deleteTrackedPlant } from "@/services/trackedPlantsService";
import { Calendar, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

const TrackedPlantCard = ({ plant }: { plant: TrackedPlant }) => {
	const [isRemoved, setIsRemoved] = useState(false);
	const { data: session } = useSession();

	const removeTrackedPlant = async () => {
		if (!plant?._id || !session?.user.id) return;
		try {
			const res = await deleteTrackedPlant(plant?._id, session?.user.id);
			if (res.ok) {
				setIsRemoved(true);
				toast.success("No longer tracking plant: " + plant.name);
			} else {
				toast.error("Failed to stop tracking plant: " + plant.name);
			}
		} catch (error) {
			toast.error("Unexpected error occured");
		}
	};
	if (isRemoved) return null;
	return (
		<div className="w-full h-fit max-h-full bg-gray-900 rounded-lg space-y-4 border border-gray-950 shadow-md shadow-black">
			<div className="w-full h-[200px] md:h-[400px] overflow-hidden">
				<img
					src={`/images/${plant.thumbnail}`}
					alt="Plant thumbnail"
					className="w-full h-full object-cover object-center border rounded-t-lg border-gray-950"
				/>
			</div>
			<div className="w-full">
				<h1 className="text-2xl text-white text-center">
					{plant.name}
				</h1>
			</div>

			<div className="flex flex-row flex-wrap text-center pt-2 pb-6 gap-5 justify-center text-white">
				<a
					className="px-4 py-3 text-base rounded-lg bg-green-700 hover:bg-green-600"
					href={`/trackedplants?tpid=${plant._id}`}
				>
					Timeline <Calendar className="inline ml-1" />
				</a>
				<button
					onClick={removeTrackedPlant}
					className="px-1 sm:px-4 py-3 text-base rounded-lg bg-red-800 hover:bg-red-700"
				>
					Stop Tracking Plant <X className="inline ml-1" />
				</button>
			</div>
		</div>
	);
};
export default TrackedPlantCard;
