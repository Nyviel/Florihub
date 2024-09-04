"use client";

import { TrackedPlant } from "@/interfaces/trackedPlant";
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
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { postTrackedPlantTimelineEvent } from "@/services/trackedPlantsService";
import { GlassWater } from "lucide-react";
import { useRouter } from "next/navigation";
const TIMELINE_EVENT_OPTIONS = ["water", "image"];

const Timeline = ({ plant }: { plant: TrackedPlant | undefined }) => {
	const [selectedEvent, setSelectedEvent] = useState("");
	const [selectedImage, setSelectedImage] = useState<File>();
	const [previewUrl, setPreviewUrl] = useState<string | null | undefined>(
		null
	);
	const router = useRouter();
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

	const addNewEvent = async (e: FormEvent) => {
		e.preventDefault();
		if (!plant) return;

		if (!TIMELINE_EVENT_OPTIONS.includes(selectedEvent)) {
			toast.error("Incorrect event option selected!");
			return;
		}

		const formData = new FormData();
		formData.append("eventType", selectedEvent);

		if (selectedImage && selectedEvent === "image") {
			formData.append("image", selectedImage);
		}

		try {
			const res = await postTrackedPlantTimelineEvent(
				plant._id,
				formData
			);
			if (res.ok) {
				toast.success("Successfully added a timeline event!");
				router.refresh();
			} else {
				toast.error("Failed to add timeline event!");
			}
		} catch (error) {
			toast.error("Failed to add timeline event!");
			console.error(error);
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
		<Gallery>
			<ul className="timeline | text-white w-1/2 mx-auto">
				{plant?.timeline.map((timelineEntry, index) => {
					return (
						<li key={index} className="timeline-entry">
							<div className="flex gap-3 items-center p-6 border-t border-b border-gray-300 hover:bg-white/15">
								<p>
									{new Date(
										timelineEntry.date
									).toLocaleDateString()}
								</p>
								-
								<div>
									{timelineEntry.event === "water" && (
										<p>
											Water{" "}
											<GlassWater className="inline text-blue-500" />
										</p>
									)}
									{timelineEntry.event === "image" && (
										<Item
											original={`${timelineEntry.value}`}
											thumbnail={`${timelineEntry.value}`}
											width={640}
											height={480}
										>
											{({ ref, open }) => (
												<Image
													ref={ref}
													onClick={open}
													src={`${timelineEntry.value}`}
													alt="timeline image preview"
													width={256}
													height={144}
													className="object-cover object-center rounded hover:cursor-pointer"
													priority={true}
												/>
											)}
										</Item>
									)}
									{timelineEntry.event === null && (
										<p>Started tracking</p>
									)}
								</div>
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
									This action adds a new event, fill the form
									below with relevant information.
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
										<Label htmlFor="picture">Picture</Label>
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
		</Gallery>
	);
};
export default Timeline;
