const api = "http://localhost:3000/api";

export const fetchPlantNames = async () => {
	return fetch(`${api}/plants/names`);
};

export const fetchPlants = async () => {
	return fetch(`${api}/plants`);
};
