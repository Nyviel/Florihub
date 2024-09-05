"use client";

import { FormEvent, useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import PlantCards from "./PlantCards";
import { Plant } from "@/interfaces/plant";
import { fetchPlants } from "@/services/plantService";
import { useParams, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const Explore = () => {
	const [error, setError] = useState("");
	const [plants, setPlants] = useState<Plant[]>([]);
	const [query, setQuery] = useState("");
	const [debounceQuery] = useDebounce(query, 350);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(9);
	const [loading, setLoading] = useState(true);
	const searchParams = useSearchParams();

	useEffect(() => {
		if (searchParams?.get("search")) {
			setQuery(searchParams.get("search") || "");
		}
	}, []);

	const getPlants = async () => {
		try {
			setLoading(true);
			const newPlants = await fetchPlants(debounceQuery, page, pageSize);
			if (newPlants) {
				setPlants(newPlants.plants);
			}
		} catch (error) {
			toast.error("Failed to fetch plants");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (debounceQuery) {
			getPlants();
		} else {
			if (!query && !debounceQuery) {
				setLoading(false);
			}
		}
	}, [debounceQuery]);

	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault();
		getPlants();
	};

	return (
		<section className="md:container min-h-full flex flex-col justify-start items-center text-white p-2 md:py-10">
			<h1 className="text-3xl font-semibold mt-20 font-poppins">
				Explore
			</h1>
			<form
				className="flex flex-col md:flex-row gap-6 w-full md:w-4/5 lg:w-3/4 xl:w-1/2 py-4 md:p-10"
				onSubmit={handleFormSubmit}
			>
				<div className="h-12 flex justify-center items-center">
					<FaFilter
						className="text-4xl hover:cursor-pointer"
						title="Filter"
					/>
				</div>
				<div className="w-full">
					<input
						type="text"
						name="search"
						id="search"
						placeholder="Search..."
						value={query}
						onChange={(e) => {
							setQuery(e.target.value);
						}}
						className="h-12 rounded px-4 py-2 text-white bg-gray-950 w-full"
					/>
					<div className="my-1">
						{error && (
							<p className="text-red-500 text-base font-medium">
								{"Error: " + error}
							</p>
						)}
					</div>
				</div>

				<div>
					<button
						type="submit"
						className="w-full h-12 transition ease-in-out duration-1000 px-4 py-2 bg-green-700 hover:bg-green-500 rounded"
					>
						Search
					</button>
				</div>
			</form>
			<div className="w-full mx-auto h-full">
				{loading ? (
					<Spinner loading={loading} />
				) : (
					<PlantCards plants={plants} />
				)}
			</div>
		</section>
	);
};
export default Explore;
