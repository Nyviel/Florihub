import { Plant } from "@/interfaces/plant";

const api = "http://localhost:3000/api";

interface PlantPaginationType {
	plants: Plant[];
	total: number;
}

export const fetchPlantNames = async (): Promise<string[]> => {
	return fetch(`${api}/plants/names`).then((response) => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json();
	});
};

export const fetchPlants = async (
	query: string,
	page: number = 1,
	pageSize: number = 9
): Promise<PlantPaginationType> => {
	return fetch(
		`${api}/plants?search=${query}&page=${page}&pageSize=${pageSize}`
	).then(async (response) => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json();
	});
};
