"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import {
	deleteTrackedPlant,
	isPlantTracked,
} from "@/services/trackedPlantsService";
import { TrackedPlant } from "@/interfaces/trackedPlant";
import { Minus } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { Input } from "@/components/ui/input";
const TIMELINE_EVENT_OPTIONS = ["water", "image"];

const TrackedPlantDetails = ({
	plant,
}: {
	plant: TrackedPlant | undefined;
}) => {
	const [plantTracked, setPlantTracked] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState("");
	const [selectedImage, setSelectedImage] = useState<File>();
	const { data: session } = useSession();

	useEffect(() => {
		console.log(plant);
		const checkPlantTracking = async () => {
			try {
				if (!plant || !plant._id || !session || !session.user) return;

				const res = await isPlantTracked(
					plant?.plantId || "",
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

	const addNewEvent = async () => {};

	const handleEventChange = (option: string) => {
		setSelectedEvent(option);
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setSelectedImage(e.target.files[0]);
			console.log("image: ", selectedImage, e.target.files);
		}
	};

	return (
		<section className="container mx-auto max-h-fit min-h-screen bg-gray-900 text-white">
			<div className="w-full py-32 ml-2">
				<h1 className="text-3xl font-semibold text-center ">
					Timeline of your {plant?.name}
				</h1>
				<div className="my-10">
					{plantTracked && (
						<button
							onClick={removeTrackedPlant}
							className="bg-orange-600 px-4 py-2 text-lg rounded-lg flex justify-center items-center"
						>
							Stop Tracking Plant{" "}
							<Minus className="inline ml-1" />
						</button>
					)}
				</div>
				<ul className="timeline | text-white space-y-10">
					{plant?.timeline.map((timelineEntry) => {
						return (
							<li
								key={timelineEntry.date}
								className="timeline-entry"
							>
								<div className="flex gap-3 items-center">
									<p>
										{new Date(
											timelineEntry.date
										).toLocaleDateString()}
									</p>
									-<p>{timelineEntry.value}</p>
								</div>
							</li>
						);
					})}
					<li key={plant?._id} className="timeline-entry">
						<Dialog>
							<DialogTrigger className="bg-green-700 py-3 px-6 rounded-lg">
								Add new event
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Adding new event</DialogTitle>
									<DialogDescription>
										This action adds a new event, fill the
										form below with relevant information.
									</DialogDescription>
								</DialogHeader>
								<hr />
								<form>
									<Label htmlFor="select">
										Type of event to add
									</Label>
									<Select onValueChange={handleEventChange}>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Event" />
										</SelectTrigger>
										<SelectContent>
											{TIMELINE_EVENT_OPTIONS.map(
												(option) => (
													<SelectItem value={option}>
														{option}
													</SelectItem>
												)
											)}
										</SelectContent>
									</Select>
									{selectedEvent === "image" && (
										<div className="grid w-full max-w-sm items-center gap-1.5 py-5">
											<Label htmlFor="picture">
												Picture
											</Label>
											<Input
												id="picture"
												type="file"
												onChange={handleFileChange}
											/>
										</div>
									)}
								</form>
							</DialogContent>
						</Dialog>
					</li>
				</ul>
			</div>
		</section>
	);
};
export default TrackedPlantDetails;
