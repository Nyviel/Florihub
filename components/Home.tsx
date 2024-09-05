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
		<section className="flex flex-col md:flex-row h-screen">
			<div className="w-full h-full flex flex-col items-center justify-center text-white bg-green-900 mt-16 md:mt-0">
				<h1 className="text-center [font-size:_clamp(1.5em,2.5vw,2.5em)]">
					Welcome to <span className="text-green-500">Flori</span>Hub
				</h1>
				<div className="flex flex-col sm:flex-row justify-center items-center gap-2 [font-size:_clamp(1.25em,2.5vw,2em)] p-2">
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
			<div className="w-full h-full flex flex-col items-center justify-center text-white text-center bg-gray-900">
				<h2 className="text-center [font-size:_clamp(1.25em,2.5vw,2em)]">
					Learn something new today, <br />
					select a plant from the form below
				</h2>

				<form className="flex flex-col gap-6 justify-center items-center w-full p-4">
					<Autocomplete
						value={value}
						onChange={(event: any, newValue: string | null) => {
							setValue(newValue);
						}}
						id="combo-box-demo"
						options={plantTitles}
						sx={{ width: 250 }}
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
						className="transition ease-in-out duration-1000 px-4 py-2 bg-green-700 hover:bg-green-500 rounded"
					>
						Search
					</button>
				</form>
			</div>
		</section>
	);
};
export default Home;
