"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import {
	deleteTrackedPlant,
	isPlantTracked,
	postTrackedPlantTimelineEvent,
} from "@/services/trackedPlantsService";
import { TrackedPlant } from "@/interfaces/trackedPlant";
import { GlassWater, Minus } from "lucide-react";
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
import { Button } from "./ui/button";
const TIMELINE_EVENT_OPTIONS = ["water", "image"];

const TrackedPlantDetails = ({
	plant,
}: {
	plant: TrackedPlant | undefined;
}) => {
	const [plantTracked, setPlantTracked] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState("");
	const [selectedImage, setSelectedImage] = useState<File>();
	const [previewUrl, setPreviewUrl] = useState<string | null | undefined>(
		null
	);
	const { data: session } = useSession();

	useEffect(() => {
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

	useEffect(() => {
		if (!selectedImage) {
			return;
		}

		const reader = new FileReader();

		reader.onloadend = () => {
			setPreviewUrl(reader.result?.toString());
		};

		reader.readAsDataURL(selectedImage);
	}, [selectedImage]);

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

	const addNewEvent = async (e: FormEvent) => {
		e.preventDefault();
		console.log(selectedEvent, selectedImage);
		if (!plant) return;

		if (!TIMELINE_EVENT_OPTIONS.includes(selectedEvent)) {
			toast.error("Incorrect event option selected!");
			return;
		}

		if (selectedEvent === "water") {
			try {
				const res = await postTrackedPlantTimelineEvent(
					plant._id,
					selectedEvent,
					selectedImage
				);
				if (res.ok) {
					toast.success("Successfully added a timeline event!");
				} else {
					toast.error("Failed to add timeline event!");
				}
			} catch (error) {
				toast.error("Failed to add timeline event!");
				console.error(error);
			}
		} else if (selectedEvent === "image") {
		}
	};

	const handleEventChange = (option: string) => {
		setSelectedEvent(option);
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setSelectedImage(e.target.files[0]);
			console.log("image: ", selectedImage, e.target.files);
			setTimeout(() => {
				console.log("image: ", selectedImage, e.target.files);
			}, 1000);
		}
	};

	const clearState = (isOpen: boolean) => {
		if (!isOpen) {
			setSelectedEvent("");
			setSelectedImage(undefined);
			setPreviewUrl("");
		}
	};

	return (
		<section className="container mx-auto max-h-fit min-h-screen  text-white">
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
					{plant?.timeline.map((timelineEntry, index) => {
						return (
							<li key={index} className="timeline-entry">
								<div className="flex gap-3 items-center">
									<p>
										{new Date(
											timelineEntry.date
										).toLocaleDateString()}
									</p>
									-
									<p>
										{timelineEntry.event === "water" && (
											<p>
												Water{" "}
												<GlassWater className="inline text-blue-500" />
											</p>
										)}
										{timelineEntry.event === "image" && (
											<p>Image func to be added</p>
										)}
										{timelineEntry.event === null && (
											<p>Started tracking</p>
										)}
									</p>
								</div>
							</li>
						);
					})}
					<li className="timeline-entry">
						<Dialog onOpenChange={clearState}>
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
								<form onSubmit={addNewEvent}>
									<div className="pb-2">
										<Label htmlFor="select">
											Type of event to add
										</Label>
									</div>
									<Select onValueChange={handleEventChange}>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Event" />
										</SelectTrigger>
										<SelectContent>
											{TIMELINE_EVENT_OPTIONS.map(
												(option, index) => (
													<SelectItem
														key={index}
														value={option}
													>
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
											{previewUrl && (
												<img
													className="w-[200px] h-[200px] pt-3"
													src={previewUrl}
													alt="Preview"
												/>
											)}
										</div>
									)}
									<div className="py-3">
										<Button type="submit">Submit</Button>
									</div>
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
