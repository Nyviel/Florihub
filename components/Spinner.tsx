"use client";
import { ClipLoader } from "react-spinners";
const override = {
	display: "block",
	margin: "100px auto",
};
const Spinner = ({ loading }: { loading: boolean }) => {
	return (
		<div className="min-h-full">
			<ClipLoader
				color="#3b82f6"
				loading={loading}
				cssOverride={override}
				size={150}
				aria-label="Loading spinner"
			/>
		</div>
	);
};

export default Spinner;
