import { TrackedPlant } from "@/interfaces/trackedPlant";

const api = "http://localhost:3000/api";

interface TrackedPlantPaginationType {
	trackedPlants: TrackedPlant[];
	total: number;
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
