"use client";
import { Plant } from "@/interfaces/plant";
import { useRouter } from "next/navigation";

const PlantCard = ({ plant }: { plant: Plant }) => {
	const router = useRouter();
	const handleButtonClick = () => {
		router.push(`/details?plant=${plant.name}`);
	};
	return (
		<div className="w-full h-fit max-h-full bg-gray-900 rounded-lg space-y-4 border border-gray-950 shadow-md shadow-black">
			<div className="w-full h-2/5">
				<img
					src={`/images/${plant.thumbnail}`}
					alt="Plant thumbnail"
					className="w-full h-full bg-cover bg-center rounded-t-lg border border-gray-950"
				/>
			</div>
			<div className="w-full flex flex-col justify-center items-center">
				<h1 className="text-2xl">{plant.name}</h1>
				<p className="text-lg text-gray-300 p-2 px-4 text-center">
					{plant.description.substring(0, 100)}...
				</p>
			</div>
			<div className="text-gray-100 flex justify-center gap-2 flex-wrap px-6">
				{plant?.tags.map((tag) => (
					<p key={tag} className="bg-green-800 rounded-md p-2 h-fit">
						{tag}
					</p>
				))}
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
export default PlantCard;
