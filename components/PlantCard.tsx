import { Plant } from "@/interfaces/plant";

const PlantCard = ({ plant }: { plant: Plant }) => {
	return (
		<div className="w-full h-fit max-h-full bg-green-800 rounded-md space-y-4">
			<div className="w-full h-2/5">
				<img
					src={`/images/${plant.thumbnail}`}
					alt="Plant thumbnail"
					className="w-full h-full bg-cover bg-center"
				/>
			</div>
			<div>
				<h1 className="text-2xl text-center">{plant.name}</h1>
			</div>
			<div className="text-gray-100 flex justify-center gap-2 flex-wrap p-6">
				{plant?.tags.map((tag) => (
					<p key={tag} className="bg-green-950 rounded-md p-2 h-fit">
						{tag}
					</p>
				))}
			</div>
			<div className="text-center p-6">
				<button className="px-8 py-4 text-lg bg-black rounded-lg">
					Details
				</button>
			</div>
		</div>
	);
};
export default PlantCard;
