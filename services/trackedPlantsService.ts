import { TrackedPlant } from "@/interfaces/trackedPlant";

const api = "http://localhost:3000/api";

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
	return fetch(
		`${api}/trackedplants?page=${page}&pageSize=${pageSize}&uid=${uid}`
	).then(async (response) => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json();
	});
};

export const fetchTrackedPlantById = async (
	tpid: string
): Promise<TrackedPlant | null> => {
	return fetch(`${api}/trackedplants/${tpid}`).then((response) => {
		if (!response.ok) {
			throw new Error("Failed to fetch tracked plant");
		} else {
			return response.json();
		}
	});
};

export const isPlantTracked = async (
	plantId: string,
	userId: string
): Promise<PlantTrackingResponse> => {
	return fetch(
		`${api}/trackedplants/istracked?pid=${plantId}&uid=${userId}`
	).then(async (response) => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json();
	});
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
