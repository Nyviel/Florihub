import { FaGithub, FaEnvelope } from "react-icons/fa";

const Contact = () => {
	return (
		<section className="text-white flex h-full items-center justify-center">
			<div className="flex flex-col w-full h-full text-center justify-start">
				<h1 className="text-3xl font-semibold py-10 mt-20 font-poppins">
					Contact
				</h1>
				<p className="px-5 text-lg">
					<span className="text-green-400">Flori</span>
					<span className="font-bold">Hub</span> was created by a
					single person, you can contact them by clicking on the mail
					icon below or through github.
				</p>
				<div className="flex gap-12 p-10 justify-center items-center">
					<a href="mailto:przemyslaw.kaczmarski11@gmail.com">
						<FaEnvelope
							title="email"
							className="text-3xl hover:cursor-pointer"
						/>
					</a>
					<a href="https://github.com/Nyviel">
						<FaGithub
							title="Github"
							className="text-3xl hover:cursor-pointer"
						/>
					</a>
				</div>
			</div>
		</section>
	);
};
export default Contact;
