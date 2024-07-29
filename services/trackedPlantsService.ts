import { TrackedPlant } from "@/interfaces/trackedPlant";

const api = "http://localhost:3000/api";

interface TrackedPlantPaginationType {
	trackedPlants: TrackedPlant[];
	total: number;
}

interface PlantTrackingResponse {
	tracking: boolean;
}

export const fetchTrackedPlants = async (
	page: number = 1,
	pageSize: number = 9
): Promise<TrackedPlantPaginationType> => {
	return fetch(`${api}/trackedplants?page=${page}&pageSize=${pageSize}`).then(
		async (response) => {
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return response.json();
		}
	);
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
	return fetch(`${api}/trackedplants?pid=${plantId}&uid=${userId}`, {
		method: "DELETE",
	});
};
