"use client";

import { TrackedPlant } from "@/interfaces/trackedPlant";
import { fetchTrackedPlantsUID } from "@/services/trackedPlantsService";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import TrackedPlantCards from "./TrackedPlantsCards";

const Profile = () => {
	const { data: session } = useSession();
	const [loading, setLoading] = useState(true);
	const [trackedPlants, setTrackedPlants] = useState<TrackedPlant[]>([]);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(9);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const fetchUserTrackedPlants = async () => {
			if (!session) return;
			try {
				const res = await fetchTrackedPlantsUID(
					page,
					pageSize,
					session.user.id
				);
				setTrackedPlants(res.trackedPlants);
				setTotal(res.total);
			} catch (error) {
				toast.error("Failed to fetch tracked plants");
			} finally {
				setLoading(false);
			}
		};
		fetchUserTrackedPlants();
	}, [session]);
	return (
		<section>
			<div className="bg-gray-900">
				<div className="container mx-auto min-h-48 text-center py-5">
					<Link
						href="/"
						className="flex items-center text-white hover:underline py-3"
					>
						<FaArrowLeft className="mr-2" /> Return to Home
					</Link>
					<h1 className="text-3xl font-bold mx-10 my-10 text-white text-center">
						Your Profile
					</h1>
					<div className="w-full flex flex-col md:flex-row gap-10 items-center justify-center">
						<p className="text-xl text-white w-fit">
							<span className="font-bold block text-white">
								Name
							</span>{" "}
							{session ? session.user?.name : ""}
						</p>
						<p className="text-xl  text-white w-fit">
							<span className="font-bold block text-white">
								Email
							</span>{" "}
							{session ? session.user?.email : ""}
						</p>
						<p className="text-xl  text-white w-fit">
							<span className="font-bold block text-white">
								Created
							</span>{" "}
							{session
								? new Date(
										session.user?.createdAt
								  ).toLocaleDateString()
								: ""}
						</p>
					</div>
				</div>
			</div>
			<div className="container m-auto my-12">
				<div className="px-6 py-8 mb-4 m-4 md:m-0">
					<div className="flex flex-col md:flex-row">
						<div className="w-full md:pl-4">
							<h2 className="text-2xl font-semibold mb-4 text-white">
								Your tracked plants
							</h2>
							{!trackedPlants.length && loading && (
								<Spinner loading={loading} />
							)}
							{!trackedPlants.length && !loading ? (
								<div>
									<p className="font-base text-lg mb-5 text-white">
										There are no plants being tracked yet.
										<br /> Track your first plant by
										clicking the button below.
									</p>
									<Link
										href="/explore"
										className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
									>
										Explore!
									</Link>
								</div>
							) : (
								<div className="w-full">
									<TrackedPlantCards plants={trackedPlants} />
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default Profile;
