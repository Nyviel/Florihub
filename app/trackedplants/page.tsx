"use client";

import Spinner from "@/components/Spinner";
import TrackedPlantDetails from "@/components/TrackedPlantDetails";
import { TrackedPlant } from "@/interfaces/trackedPlant";
import { fetchTrackedPlantById } from "@/services/trackedPlantsService";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TrackedPlantsPage = () => {
	const [loading, setLoading] = useState(true);
	const [plant, setPlant] = useState<TrackedPlant>();
	const searchParams = useSearchParams();
	const router = useRouter();
	const { data: session, status } = useSession();
	useEffect(() => {
		if (status === "loading") {
			return;
		}
		if (!session || !session.user) {
			router.replace("/");
		}
	}, [session, status]);

	useEffect(() => {
		const getTrackedPlant = async () => {
			const trackedPlantId = searchParams.get("tpid");
			if (!trackedPlantId) {
				router.replace("/");
			} else {
				try {
					const res = await fetchTrackedPlantById(trackedPlantId);
					if (res) {
						setPlant(res);
					} else {
						toast.error("No tracked plant found");
						router.replace("/profile");
					}
				} catch (error) {
					console.error(error);
					toast.error("Failed to fetch tracked plant");
				} finally {
					setLoading(false);
				}
			}
		};
		getTrackedPlant();
	}, []);
	return loading ? (
		<Spinner loading={loading} />
	) : (
		<TrackedPlantDetails plant={plant} />
	);
};
export default TrackedPlantsPage;
