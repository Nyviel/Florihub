"use client";
import { ClipLoader } from "react-spinners";
const override = {
	display: "block",
	position: "absolute",
	top: "50%",
	left: "50%",
	translate: "-50% -50%",
};
const Spinner = ({ loading }: { loading: boolean }) => {
	return (
		<ClipLoader
			color="#39ff14"
			loading={loading}
			cssOverride={override}
			size={150}
			aria-label="Loading spinner"
		/>
	);
};

export default Spinner;
