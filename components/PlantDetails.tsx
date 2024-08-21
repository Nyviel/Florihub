"use client";

import { Plant } from "@/interfaces/plant";
import { Construction, Flower2, Minus, Plus, Sprout } from "lucide-react";
import Image from "next/image";
import { FaBiohazard, FaSun, FaWater } from "react-icons/fa";
import Collapsible from "react-collapsible";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import {
	deleteTrackedPlant,
	isPlantTracked,
	postTrackedPlant,
} from "@/services/trackedPlantsService";
import { Gallery, Item } from "react-photoswipe-gallery";

const PlantDetails = ({ plant }: { plant: Plant | undefined }) => {
	const [plantTracked, setPlantTracked] = useState(false);
	const { data: session } = useSession();
	const excludeRows = ["_id", "description", "thumbnail", "images"];

	useEffect(() => {
		const checkPlantTracking = async () => {
			try {
				if (!plant || !plant._id || !session || !session.user) return;

				const res = await isPlantTracked(
					plant?._id || "",
					session?.user.id || ""
				);
				if (res) {
					setPlantTracked(res.tracking);
				} else {
					toast.error("Failed to check plant tracking status");
				}
			} catch (error) {
				toast.error("Failed to check plant tracking status");
			}
		};
		checkPlantTracking();
	}, [session, plant]);

	const addTrackedPlant = async () => {
		if (!plant?._id) return;
		if (!session) {
			toast.error("Log in to track a plant");
			return;
		}
		try {
			const res = await postTrackedPlant(plant?._id, session?.user.id);
			if (res.ok) {
				toast.success("Tracking plant: " + plant.name);
				setPlantTracked(true);
			} else {
				toast.error("Failed to track plant: " + plant.name);
			}
		} catch (error) {
			toast.error("Unexpected error occured");
		}
	};
	const removeTrackedPlant = async () => {
		if (!plant?._id || !session?.user.id) return;
		try {
			const res = await deleteTrackedPlant(plant?._id, session?.user.id);
			if (res.ok) {
				toast.success("No longer tracking plant: " + plant.name);
				setPlantTracked(false);
			} else {
				toast.error("Failed to stop tracking plant: " + plant.name);
			}
		} catch (error) {
			toast.error("Unexpected error occured");
		}
	};

	return (
		<Gallery>
			<section className="container mx-auto h-fit text-white">
				<div className="w-full">
					<h1 className="flex-1 text-center text-2xl lg:text-4xl pt-24 font-semibold">
						{plant?.name}
					</h1>
				</div>
				<div className="w-full flex flex-col sm:flex-row mt-10">
					{plant?.images.length === 1 ? (
						<Item
							original={`/images/${plant?.images[0]}`}
							thumbnail={`/images/${plant?.images[0]}`}
							width={1280}
							height={720}
						>
							{({ ref, open }) => (
								<Image
									ref={ref}
									onClick={open}
									src={`/images/${plant?.images[0]}`}
									alt="Plant Image"
									height={600}
									width={1000}
									className="h-[600px] object-cover rounded-xl mx-auto"
									priority={true}
								/>
							)}
						</Item>
					) : (
						<div className="grid grid-cols-2 gap-4">
							{plant?.images.map((image, index) => {
								return (
									<div
										key={index}
										className={`${
											plant?.images.length === 3 &&
											index === 2
												? "col-span-2"
												: "col-span-1"
										}`}
									>
										<Item
											original={`/images/${image}`}
											thumbnail={`/images/${image}`}
											width={1280}
											height={720}
										>
											{({ ref, open }) => (
												<Image
													ref={ref}
													onClick={open}
													src={`/images/${image}`}
													alt="Property Image"
													className="object-cover h-[400px] mx-auto rounded-xl hover:cursor-pointer"
													width={1800}
													height={400}
													priority={true}
												/>
											)}
										</Item>
									</div>
								);
							})}
						</div>
					)}
					<div className="w-full sm:w-1/4 sm:min-w-[300px]">
						<ul
							className="flex flex-row sm:flex-col flex-wrap items-center justify-center text-center gap-5 py-3 "
							role="list"
						>
							<li className="flex flex-col gap-2">
								<span className="flex justify-center items-center">
									<FaSun className="inline mr-2" /> Light
								</span>
								{plant?.light.map((light) => (
									<p key={light} className="text-yellow-300">
										{light}
									</p>
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
									<p key={bloom} className="text-green-500 ">
										{bloom}
									</p>
								))}
							</li>
							<li className="flex flex-col gap-2">
								<span className="flex justify-center items-center">
									<Sprout className="inline mr-1" /> Soil
								</span>
								{plant?.soil.map((soil: string) => (
									<p key={soil} className="text-amber-600">
										{soil?.charAt(0)?.toUpperCase() +
											soil?.slice(1)}
									</p>
								))}
							</li>
							<li className="flex flex-col gap-2">
								<span className="flex justify-center items-center">
									<FaBiohazard className="inline mr-2" />{" "}
									Toxicity
								</span>
								<p className="text-lime-400">
									{plant?.toxicity}
								</p>
							</li>
							<li className="flex flex-col gap-2">
								<span className="flex justify-center items-center">
									<Construction className="inline mr-2" />{" "}
									Maintenance
								</span>
								<p className="text-red-400">
									{plant?.maintenance}
								</p>
							</li>
						</ul>
					</div>
				</div>
				<div className="w-full py-10 ml-2">
					{!plantTracked ? (
						<button
							onClick={addTrackedPlant}
							className="bg-green-600 px-4 py-2 text-lg rounded-lg flex justify-center items-center"
						>
							Track Plant <Plus className="inline ml-1" />
						</button>
					) : (
						<button
							onClick={removeTrackedPlant}
							className="bg-orange-600 px-4 py-2 text-lg rounded-lg flex justify-center items-center"
						>
							Stop Tracking Plant{" "}
							<Minus className="inline ml-1" />
						</button>
					)}
				</div>
				<div className="w-full pb-10 ml-2">
					<Collapsible trigger="General Information">
						<table className="w-full">
							<tbody>
								{Object.entries(plant!)
									.filter(
										(entry) =>
											!excludeRows.includes(entry[0])
									)
									.map((entry, index) => (
										<tr key={index}>
											<td className="sm:px-4 py-1 border border-green-500">
												{entry[0]}
											</td>
											<td className="sm:px-4 py-1 border border-green-500">
												{Array.isArray(entry[1])
													? entry[1].map(
															(e) => e + " "
													  )
													: entry[1]}
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</Collapsible>
				</div>
				<div className="w-full py-10 ml-2">
					<h3 className="text-2xl font-semibold">Description</h3>
					<p className="py-2">{plant?.description}</p>
					{/* <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown> */}
				</div>
			</section>
		</Gallery>
	);
};
export default PlantDetails;
