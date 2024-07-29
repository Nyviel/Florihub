type TimelineEntryEvent = "water" | "image" | null;

export interface TimelineEntry {
	date: number;
	value: string;
	event: TimelineEntryEvent;
}

export interface TrackedPlant {
	plantId: string;
	userId: string;
	name: string;
	timeline: TimelineEntry[];
	images: string[];
	thumbnail: string;
}
