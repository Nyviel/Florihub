type TimelineEntryEvent = "water" | "image" | null;

export interface TimelineEntry {
	_id: string;
	date: number;
	value: string;
	event: TimelineEntryEvent;
}

export interface TrackedPlant {
	_id: string;
	plantId: string;
	userId: string;
	name: string;
	timeline: TimelineEntry[];
	images: string[];
	thumbnail: string;
}
