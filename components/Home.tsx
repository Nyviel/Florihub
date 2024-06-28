"use client";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typewriter from "typewriter-effect";
import { FormEvent, use, useEffect, useState } from "react";
import { fetchPlantNames } from "@/services/plantService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const inputFieldStyling = {
	"& .MuiInputBase-root": {
		backgroundColor: "#111827",
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: "white",
		},
		"&:hover fieldset": {
			borderColor: "white",
		},
		"&.Mui-focused fieldset": {
			borderColor: "white",
		},
	},
	"& .MuiInputBase-input::placeholder": {
		color: "green",
		opacity: 1,
	},
	"& .MuiInputLabel-root": {
		color: "white", // Default label color
	},
	"& .MuiInputLabel-root.Mui-focused": {
		color: "white", // Focused label color
	},
	"& .MuiInputLabel-root.MuiInputLabel-shrink": {
		color: "green", // Shrunk label color
	},
	"& .MuiInputBase-input": {
		color: "white", // Text input color
	},
};

const Home = () => {
	const words = [
		"Aloe",
		"Agave",
		"Monstera",
		"Philodendron",
		"Begonia",
		"Opuntia",
		"Echeveria",
		"Crassula",
		"Haworthia",
		"Hoya",
		"Maranta",
		"And many others to explore",
	];
	const [plantTitles, setPlantTitles] = useState<string[]>([""]);
	const [value, setValue] = useState<string | null>(plantTitles[0]);
	const router = useRouter();
	useEffect(() => {
		const getPlantNames = async () => {
			try {
				const res = await fetchPlantNames();

				if (res && res.length > 0) {
					setPlantTitles(res);
				}
			} catch (error) {
				console.error(error);
				toast.error("Failed to fetch plant names");
			}
		};
		getPlantNames();
	}, []);

	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault();

		router.push(`/explore?search=${value}`);
	};

	return (
		<section className="text-white flex flex-col md:flex-row h-full items-center justify-center">
			<div className="flex flex-col w-full h-full text-center justify-center bg-green-900">
				<div className="flex flex-col justify-center items-center h-1/4 w-full -mt-20">
					<div className="h-24">
						<h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
							Welcome to{" "}
							<span className="text-green-400">Flori</span>
							<span className="font-bold">Hub</span>
						</h1>
					</div>
					<div className="flex-1 flex justify-center items-center">
						<div className=" flex justify-center items-center gap-2 text-2xl p-2">
							Your go to hub for
							<span className="text-green-400">
								<Typewriter
									options={{
										strings: words,
										delay: 75,
										autoStart: true,
										loop: true,
									}}
								/>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col w-full h-full justify-center text-center bg-gray-900">
				<div className="flex flex-col justify-center items-center h-1/4 w-full -mt-20">
					<div className="h-fit sm:h-24">
						<h2 className="text-xl md:text-2xl lg:text-3xl lg:leading-10">
							Learn something new today, <br />
							select a plant from the form below
						</h2>
					</div>
					<div className="flex-1 w-full py-4">
						<form className="flex flex-col gap-6 justify-center items-center w-full">
							<Autocomplete
								value={value}
								onChange={(
									event: any,
									newValue: string | null
								) => {
									setValue(newValue);
								}}
								id="combo-box-demo"
								options={plantTitles}
								sx={{ width: 300 }}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Enter plant name..."
										sx={inputFieldStyling}
									/>
								)}
							/>
							<button
								type="button"
								onClick={handleFormSubmit}
								className="px-4 py-2 bg-green-700 rounded"
							>
								Search
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};
export default Home;
