type TimelineEntryEvent = "water" | "image" | null;

export interface TimelineEntry {
	date: Number;
	value: String;
	event: TimelineEntryEvent;
}

export interface TrackedPlant {
	userId: string;
	name: string;
	timeline: TimelineEntry[];
	images: string[];
}
