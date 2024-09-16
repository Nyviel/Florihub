import { TrackedPlant } from "@/interfaces/trackedPlant";
import { api } from "@/utils/constants";

interface TrackedPlantPaginationType {
	trackedPlants: TrackedPlant[];
	total: number;
}

interface PlantTrackingResponse {
	tracking: boolean;
}

export const fetchTrackedPlantsUID = async (
	page: number = 1,
	pageSize: number = 9,
	uid: string
): Promise<TrackedPlantPaginationType> => {
	return (
		await fetch(
			`${api}/trackedplants?page=${page}&pageSize=${pageSize}&uid=${uid}`
		)
	).json();
};

export const fetchTrackedPlantById = async (
	tpid: string
): Promise<TrackedPlant | null> => {
	return (await fetch(`${api}/trackedplants/${tpid}`)).json();
};

export const isPlantTracked = async (
	plantId: string,
	userId: string
): Promise<PlantTrackingResponse> => {
	return (
		await fetch(
			`${api}/trackedplants/istracked?pid=${plantId}&uid=${userId}`
		)
	).json();
};

export const postTrackedPlant = async (
	plantId: string,
	userId: string
): Promise<Response> => {
	return fetch(`${api}/trackedplants`, {
		method: "POST",
		body: JSON.stringify({
			userId: userId,
			plantId: plantId,
		}),
	});
};

export const deleteTrackedPlant = async (
	plantId: string,
	userId: string
): Promise<Response> => {
	return fetch(`${api}/trackedplants/${plantId}?uid=${userId}`, {
		method: "DELETE",
	});
};

export const postTrackedPlantTimelineEvent = async (
	trackedPlantId: string,
	formData: FormData
): Promise<Response> => {
	return fetch(`${api}/trackedplants/timeline?tpid=${trackedPlantId}`, {
		method: "POST",
		body: formData,
	});
};

export const deleteTrackedPlantTimelineEvent = async (
	eventId: string,
	trackedPlantId: string
): Promise<Response> => {
	return fetch(
		`${api}/trackedplants/timeline/${eventId}?tpid=${trackedPlantId}`,
		{
			method: "delete",
		}
	);
};
