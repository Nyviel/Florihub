"use client";

import { FormEvent, useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import PlantCards from "./PlantCards";
import { Plant } from "@/interfaces/plant";
import { fetchPlants } from "@/services/plantService";
import { useParams, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

const Explore = () => {
	const [error, setError] = useState("");
	const [plants, setPlants] = useState<Plant[]>([]);
	const [query, setQuery] = useState("");
	const [debounceQuery] = useDebounce(query, 350);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(9);
	const searchParams = useSearchParams();

	useEffect(() => {
		if (searchParams?.get("search")) {
			setQuery(searchParams.get("search") || "");
		}
	}, [searchParams]);

	const getPlants = async () => {
		const newPlants = await fetchPlants(debounceQuery, page, pageSize);
		if (newPlants) {
			setPlants(newPlants.plants);
		}
	};

	useEffect(() => {
		getPlants();
	}, [debounceQuery]);

	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault();
		getPlants();
	};

	return (
		<section className="w-full min-h-full bg-green-900 flex flex-col justify-start items-center text-white">
			<h1 className="text-3xl font-semibold py-10 font-poppins">
				Explore
			</h1>
			<form
				className="flex flex-col md:flex-row gap-6 w-full md:w-4/5 lg:w-3/4 xl:w-1/2 p-10"
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
						required
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
						className="w-full h-12 px-4 py-2 bg-green-700 hover:bg-green-800 rounded"
					>
						Search
					</button>
				</div>
			</form>
			<div className="container mx-auto h-full">
				<PlantCards plants={plants} />
			</div>
		</section>
	);
};
export default Explore;
