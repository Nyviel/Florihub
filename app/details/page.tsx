"use client";
import PlantDetails from "@/components/PlantDetails";
import Spinner from "@/components/Spinner";
import { Plant } from "@/interfaces/plant";
import { fetchPlantByName } from "@/services/plantService";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DetailsPage = () => {
	const searchParams = useSearchParams();
	const [plant, setPlant] = useState<Plant>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const plantName = searchParams?.get("plant");
		if (plantName) {
			const getPlant = async () => {
				const plantObject = await fetchPlantByName(plantName);
				if (plantObject) {
					setPlant(plantObject);
				} else {
					toast.error("Failed to fetch plant");
				}
				setLoading(false);
			};
			getPlant();
		}
	}, [searchParams]);

	return loading ? (
		<Spinner loading={loading} />
	) : (
		<PlantDetails plant={plant} />
	);
};
export default DetailsPage;
