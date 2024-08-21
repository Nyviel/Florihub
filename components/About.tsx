const About = () => {
	return (
		<section className="text-white flex h-full items-center justify-center">
			<div className="flex flex-col w-full h-full justify-start items-center text-center sm:text-left">
				<h1 className="text-3xl font-semibold py-10 mt-20 font-poppins">
					About
				</h1>
				<p className="text-lg leading-6 max-w-prose px-5">
					<span className="text-green-400">Flori</span>
					<span className="font-bold">Hub</span> is a platform for all
					matter of flora, goal of this project is to let users learn
					about different plants with general information regarding
					what it is, what it looks like, and what are its care
					requirements.
				</p>
				<p className="text-lg leading-6 max-w-prose mt-10 px-5 pb-5">
					This service allow users to create accounts which they can
					use to add existing plants on the platform to their
					collection, then the user can use that as a tracker of their
					plants growth by adding images with timestamps every X time,
					tracking last time watered etc.
				</p>
			</div>
		</section>
	);
};
export default About;
