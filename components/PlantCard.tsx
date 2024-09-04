"use client";
import { Plant } from "@/interfaces/plant";
import Image from "next/image";

const PlantCard = ({ plant }: { plant: Plant }) => {
	return (
		<div className="w-full mx-auto h-full bg-gray-900 rounded-lg space-y-4 border border-gray-950 shadow-md shadow-black">
			<div className="w-full h-[200px] md:h-[400px] overflow-hidden">
				<Image
					src={`/images/${plant.thumbnail}`}
					alt="Plant thumbnail"
					width={0}
					height={0}
					sizes="100vw"
					className="w-full h-full object-cover object-center border rounded-t-lg border-gray-950"
				/>
			</div>
			<div className="w-full flex flex-col justify-center items-center gap-2">
				<h1 className="text-lg md:text-2xl text-center font-semibold">
					{plant.name}
				</h1>
				{/* <p className="text-base md:text-lg text-gray-300 p-2 px-4 text-center">
					{plant.description.substring(
						0,
						plant.description.length > 200
							? 200
							: plant.description.length
					)}
					...
				</p> */}
			</div>
			<div className="text-gray-100 flex justify-center gap-2 flex-wrap px-6">
				{plant?.tags.map((tag) => (
					<p
						key={tag}
						className="bg-green-800 rounded-md p-2 h-fit text-center"
					>
						{tag}
					</p>
				))}
			</div>
			<div className="text-center p-6">
				<a
					className="px-8 py-4 text-lg bg-green-700 rounded-lg"
					href={`/details?plant=${plant.name}`}
				>
					Details
				</a>
			</div>
		</div>
	);
};
export default PlantCard;
