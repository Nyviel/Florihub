"use client";

import { Plant } from "@/interfaces/plant";
import { Construction, Flower2, Sprout } from "lucide-react";
import Image from "next/image";
import {
	FaArrowDown,
	FaBiohazard,
	FaChevronDown,
	FaSun,
	FaWater,
} from "react-icons/fa";
import Collapsible from "react-collapsible";
import { isArray } from "util";
const PlantDetails = ({ plant }: { plant: Plant | undefined }) => {
	const excludeRows = ["_id", "description", "thumbnail", "images"];
	return (
		<section className="container mx-auto h-fit bg-gray-900 text-white">
			<h1 className="text-center text-3xl pt-24 font-semibold">
				{plant?.name}
			</h1>
			<div className="w-full flex flex-col sm:flex-row mt-10">
				<div className="w-full sm:w-3/4 max-h-[600px] p-2">
					<Image
						src={`/images/${plant?.images[0]}`}
						alt=""
						height={0}
						width={0}
						sizes="100vw"
						className="w-full h-full object-cover rounded-xl mx-auto"
					/>
				</div>
				<div className="w-full sm:w-1/4">
					<ul
						className="flex flex-row sm:flex-col flex-wrap items-center justify-center text-center gap-5 py-3 "
						role="list"
					>
						<li className="flex flex-col gap-2">
							<span className="flex justify-center items-center">
								<FaSun className="inline mr-2" /> Light
							</span>
							{plant?.light.map((light) => (
								<p className="text-yellow-300">{light}</p>
							))}
						</li>
						<li className="flex flex-col gap-2">
							<span className="flex justify-center items-center">
								<FaWater className="inline mr-2" /> Water
							</span>
							<p className="text-blue-300">{plant?.water}</p>
						</li>
						<li className="flex flex-col gap-2">
							<span className="flex justify-center items-center">
								<Flower2 className="inline mr-1" /> Bloom
							</span>
							{plant?.bloom.map((bloom) => (
								<p className="text-green-500 ">{bloom}</p>
							))}
						</li>
						<li className="flex flex-col gap-2">
							<span className="flex justify-center items-center">
								<Sprout className="inline mr-1" /> Soil
							</span>
							{plant?.soil.map((soil: string) => (
								<p className="text-amber-600">
									{soil?.charAt(0)?.toUpperCase() +
										soil?.slice(1)}
								</p>
							))}
						</li>
						<li className="flex flex-col gap-2">
							<span className="flex justify-center items-center">
								<FaBiohazard className="inline mr-2" /> Toxicity
							</span>
							<p className="text-lime-400">{plant?.toxicity}</p>
						</li>
						<li className="flex flex-col gap-2">
							<span className="flex justify-center items-center">
								<Construction className="inline mr-2" />{" "}
								Maintenance
							</span>
							<p className="text-red-400">{plant?.maintenance}</p>
						</li>
					</ul>
				</div>
			</div>
			<div className="w-full py-10">
				<Collapsible trigger="General Information">
					<table className="w-full">
						{Object.entries(plant!)
							.filter((entry) => !excludeRows.includes(entry[0]))
							.map((entry) => (
								<tr>
									<td className="sm:px-4 py-1 border border-green-500">
										{entry[0]}
									</td>
									<td className="sm:px-4 py-1 border border-green-500">
										{Array.isArray(entry[1])
											? entry[1].map((e) => e + " ")
											: entry[1]}
									</td>
								</tr>
							))}
					</table>
				</Collapsible>
			</div>
			<div className="w-full py-10">
				<h3 className="text-2xl font-semibold">Description</h3>
				<p className="py-2">{plant?.description}</p>
			</div>
		</section>
	);
};
export default PlantDetails;
