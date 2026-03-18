import React, { useEffect, useRef } from "react";
import heroBg from "../../assets/videos/Hero.mp4";
import { Link } from "react-router";

const Hero = () => {
	const headingRef = useRef(null);
	const subRef = useRef(null);
	const btnsRef = useRef(null);
	const badgeRef = useRef(null);

	useEffect(() => {
		const items = [badgeRef, headingRef, subRef, btnsRef];
		items.forEach((ref, i) => {
			if (ref.current) {
				ref.current.style.opacity = "0";
				ref.current.style.transform = "translateY(28px)";
				ref.current.style.transition = `opacity 0.8s ease ${i * 0.18}s, transform 0.8s ease ${i * 0.18}s`;
				setTimeout(() => {
					ref.current.style.opacity = "1";
					ref.current.style.transform = "translateY(0)";
				}, 80);
			}
		});
	}, []);

	return (
		<div className="relative w-full h-screen min-h-[600px] overflow-hidden">
			{/* Video */}
			<video
				src={heroBg}
				autoPlay
				loop
				muted
				playsInline
				className="absolute inset-0 w-full h-full object-cover"
			/>

			{/* Layered overlay: dark at bottom for text legibility, teal tint at top */}
			<div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/85" />
			<div className="absolute inset-0 bg-[#306073]/10" />

			{/* Subtle grain overlay */}
			<div
				className="absolute inset-0 opacity-[0.04] pointer-events-none"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
					backgroundSize: "200px 200px",
				}}
			/>

			{/* Teal accent line — top of page */}
			<div className="absolute top-0 left-0 right-0 h-[3px] bg-[#306073]" />

			{/* Content */}
			<div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-6">
				{/* Badge */}
				<div
					ref={badgeRef}
					className="inline-flex items-center gap-2 border border-[#306073]/60 bg-[#306073]/10 backdrop-blur-sm text-[#7fbdcc] text-xs font-semibold tracking-[0.2em] uppercase px-5 py-2 rounded-full mb-2 md:mb-8 ">
					<span className="w-1.5 h-1.5 rounded-full bg-[#306073] animate-pulse inline-block" />
					One Of The Most Trusted Freelance Platform
				</div>

				{/* Heading */}
				<h1
					ref={headingRef}
					className="text-4xl sm:text-6xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight max-w-5xl font-newfont3"
					>
					Connecting
					<span
						className="block"
						style={{
							WebkitTextStroke: "1.5px #306073",
							color: "transparent",
						}}>
						Brilliance.
					</span>
					Delivering
					<span className="text-white"> Excellence.</span>
				</h1>

				{/* Subtext */}
				<p
					ref={subRef}
					className="mt-4 md:mt-6 text-base sm:text-lg text-white/55 max-w-xl leading-relaxed font-light tracking-wide">
					The smarter way to hire top-tier freelancers — or showcase your skills to the world.
				</p>

				{/* Buttons */}
				<div ref={btnsRef} className="flex flex-col sm:flex-row gap-4 mt-6 lg:mt-12">
					<Link to="register">
						<button className="group relative overflow-hidden px-10 py-2 md:py-4 text-xs lg:text-sm sm:text-base font-semibold tracking-widest uppercase bg-white text-[#0d0d0d] transition-all duration-300 hover:bg-[#306073] hover:text-white hover:shadow-[0_0_30px_rgba(48,96,115,0.4)]">
							<span className="relative z-10">Get Lancers</span>
						</button>
					</Link>
					<Link to="register">
						<button className="group px-10 py-2 md:py-4 text-xs lg:text-sm sm:text-base font-semibold tracking-widest uppercase border border-white/40 text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-[#306073] hover:text-[#7fbdcc] hover:shadow-[0_0_30px_rgba(48,96,115,0.2)]">
							Start Lancing
						</button>
					</Link>
				</div>

				{/* Stats row */}
				<div className="flex items-center gap-10 mt-10 md:mt-16 border-t border-white/10 pt-8">
					{[
						{ value: "50K+", label: "Freelancers" },
						{ value: "120K+", label: "Projects Done" },
						{ value: "4.9★", label: "Avg. Rating" },
					].map((stat) => (
						<div key={stat.label} className="text-center">
							<div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
							<div className="text-xs text-white/40 tracking-widest uppercase mt-0.5">{stat.label}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Hero;
