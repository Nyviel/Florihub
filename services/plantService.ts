import { Plant } from "@/interfaces/plant";

const api = "http://localhost:3000/api";

export const fetchPlantNames = async (): Promise<string[]> => {
	return fetch(`${api}/plants/names`).then((response) => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json();
	});
};

export const fetchPlants = async (): Promise<Plant[]> => {
	return fetch(`${api}/plants`).then((response) => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json();
	});
};
