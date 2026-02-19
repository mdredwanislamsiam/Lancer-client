import React from 'react';
import { FaRocket, FaShieldAlt, FaBolt, FaUsers, FaUserTie, FaGlobe, FaChartLine, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router';

const About = () => {

    const items = [
		{
			icon: <FaBolt />,
			title: "Precision Matching",
			description: "We don't just provide a list; we provide the solution. Find the perfect expert in minutes.",
		},
		{
			icon: <FaShieldAlt />,
			title: "Built-In Integrity",
			description: "Every milestone is protected by our secure, transparent payment infrastructure.",
		},
		{
			icon: <FaGlobe />,
			title: "Velocity Without Compromise",
			description: "Skip the bureaucracy. Start your project at the speed of the modern market.",
		},
	];

    const clientItems = [
		{
			title: "Vetted Quality",
			text: "We prioritize excellence over volume, ensuring top-tier results.",
		},
		{
			title: "Secure Escrow",
			text: "Funds are only released when you are 100% satisfied with the work.",
		},
		{
			title: "24/7 Support",
			text: "Dedicated assistance to ensure your collaboration remains seamless.",
		},
    ];
    
    const customerItems = [
		{
			title: "Financial Freedom",
			text: "Competitive fees and the fastest payout cycles in the industry.",
		},
		{
			title: "Global Exposure",
			text: "Access to high-value clients across all major digital categories.",
		},
		{
			title: "Career Ownership",
			text: "Professional tools designed to help you run your business efficiently.",
		},
	];

    return (
		<div className="bg-base-100 text-base-content min-h-screen">
			{/* Hero Section */}
			<section className="relative overflow-hidden py-24 lg:py-32 px-6">
				<div className="max-w-7xl mx-auto text-center relative z-10">
					<h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 headTitle font-newfont3">
						Empowering Visionaries. <br />
						<span className="text-base-content font-newfont3">Elevating Talent.</span>
					</h1>
					<p className="text-xl lg:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed mb-10">
						The global bridge between ambitious businesses and world-class experts in{" "}
						<span className="text-base-content font-semibold">
							design, development, writing, and marketing.
						</span>
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Link to={"/register"}>
							<button className="btn px-6 py-3 lg:px-10 lg:py-5 font-bold text-white rounded-full bg-gradient-to-r from-[#32435a] to-[#678b9d] hover:from-[#072e4c] hover:to-[#4a7ca3] shadow-lg shadow-[#32435a]/40 transform transition-transform duration-300 hover:scale-105 ring-1 ring-[#678b9d]/50 hover:ring-[#072e4c]/70 text-sm lg:text-lg w-fit">
								Explore Talent
							</button>
						</Link>
						<Link to={"/register"}>
							<button className="btn px-6 py-3 lg:px-10 lg:py-5 font-bold text-white rounded-full bg-gradient-to-r from-[#32435a] to-[#678b9d] hover:from-[#072e4c] hover:to-[#4a7ca3] shadow-lg shadow-[#32435a]/40 transform transition-transform duration-300 hover:scale-105 ring-1 ring-[#678b9d]/50 hover:ring-[#072e4c]/70 text-sm lg:text-lg w-fit">
								Join as Freelancer
							</button>
						</Link>
					</div>
				</div>
			</section>

			{/* Intro & Mission/Vision */}
			<section className="py-20 bg-base-200/50 px-6">
				<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
					<div className="space-y-8">
						<div>
							<h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Narrative</h2>
							<p className="text-lg text-gray-600 leading-relaxed">
								In a world that never stops moving, the way we work has changed forever. Lancer was born
								out of a simple yet powerful conviction: that talent is universal, but opportunity is
								not. We didn't just build a platform; we built an ecosystem where innovation meets
								execution at the speed of thought.
							</p>
						</div>
						<div className="grid md:grid-cols-2 gap-8">
							<div className="bg-base-100 p-8 rounded-3xl shadow-sm border border-base-300 transition-colors">
								<div className="w-12 h-12 bg-[#3261a3]/10 rounded-2xl flex items-center justify-center text-[#3261a3] mb-5 text-2xl">
									<FaRocket />
								</div>
								<h3 className="text-xl font-bold mb-3">Our Mission</h3>
								<p className="text-gray-500 text-sm leading-relaxed">
									To democratize professional growth. We empower freelancers to build sustainable,
									high-impact careers while helping businesses scale faster.
								</p>
							</div>
							<div className="bg-base-100 p-8 rounded-3xl shadow-sm border border-base-300 hover:border-primary/30 transition-colors">
								<div className="w-12 h-12 bg-[#3261a3]/10 rounded-2xl flex items-center justify-center text-[#3261a3] mb-5 text-2xl">
									<FaChartLine />
								</div>
								<h3 className="text-xl font-bold mb-3">Our Vision</h3>
								<p className="text-gray-500 text-sm leading-relaxed">
									To be the world's most trusted engine for digital collaboration, where every project
									is a success story.
								</p>
							</div>
						</div>
					</div>
					<div className="relative">
						<div className="aspect-square bg-linear-to-br from-[#bac9eb] to-[#7087a8] rounded-[3rem] overflow-hidden shadow-2xl flex items-center justify-center">
							<div className="text-center p-12">
								<div className="text-6xl font-black text-[#3261a3] mb-4">10k+</div>
								<div className="text-xl font-medium uppercase tracking-widest text-gray-500">
									Global Partners
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Differentiation Section */}
			<section className="py-24 px-6">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-4">The Lancer Advantage</h2>
						<p className="text-gray-500 text-lg">What sets us apart in the digital economy</p>
					</div>
					<div className="grid md:grid-cols-3 gap-10">
						{items.map((item, i) => (
							<div
								key={i}
								className="group p-8 rounded-3xl bg-base-200/30 hover:bg-base-100 border border-transparent hover:border-base-300 hover:shadow-xl transition-all duration-300">
								<div className="w-16 h-16 rounded-2xl bg-base-100 shadow-md flex items-center justify-center text-2xl text-[#376994] mb-6 group-hover:scale-110 transition-transform">
									{item.icon}
								</div>
								<h3 className="text-2xl font-bold mb-4">{item.title}</h3>
								<p className="text-gray-500 leading-relaxed">{item.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Trust/Love Section */}
			<section className="py-24 bg-base-200 px-2 lg:px-10 mx-auto">
				<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
					{/* Buyers */}
					<div className="bg-base-100 p-10 lg:p-12 rounded-[2.5rem] shadow-sm flex flex-col h-full">
						<div className="flex items-center gap-4 mb-8">
							<div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center text-[#446db1] text-2xl font-bold">
								<FaUserTie />
							</div>
							<h2 className="text-2xl lg:text-3xl font-bold">Why Clients Trust Us</h2>
						</div>
						<ul className="space-y-6 flex-grow">
							{clientItems.map((item, i) => (
								<li key={i} className="flex gap-4">
									<FaCheckCircle className="text-[#446db1] mt-1 flex-shrink-0" />
									<div>
										<h4 className="font-bold text-lg">{item.title}</h4>
										<p className="text-gray-500">{item.text}</p>
									</div>
								</li>
							))}
						</ul>
					</div>
					{/* Freelancers */}
					<div className="bg-base-100 p-10 lg:p-12 rounded-[2.5rem] shadow-sm flex flex-col h-full">
						<div className="flex items-center gap-4 mb-8">
							<div className="w-14 h-14 bg-blue-400/10 rounded-full flex items-center justify-center text-[#446db1] text-2xl font-bold">
								<FaUsers />
							</div>
							<h2 className="text-3xl font-bold">Why Freelancers Love Us</h2>
						</div>
						<ul className="space-y-6 flex-grow">
							{customerItems.map((item, i) => (
								<li key={i} className="flex gap-4">
									<FaCheckCircle className="text-[#446db1] mt-1 flex-shrink-0" />
									<div>
										<h4 className="font-bold text-lg">{item.title}</h4>
										<p className="text-gray-500">{item.text}</p>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-24 px-6 text-center">
				<div className="max-w-4xl mx-auto bg-neutral text-neutral-content p-12 lg:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden">
					<div className="">
						<h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to redefine what’s possible?</h2>
						<p className="text-xl opacity-80 mb-10 max-w-2xl mx-auto leading-relaxed">
							Join thousands of visionaries and experts who are already building the future on Lancer.
							Let’s create something extraordinary together.
						</p>
						<Link to={"/register"}>
							<button className="btn px-6 py-3 lg:px-10 lg:py-5 font-bold text-white rounded-full bg-gradient-to-r from-[#32435a] to-[#678b9d] hover:from-[#072e4c] hover:to-[#4a7ca3] shadow-lg shadow-[#32435a]/40 transform transition-transform duration-300 hover:scale-105 ring-1 ring-[#678b9d]/50 hover:ring-[#072e4c]/70 text-sm lg:text-lg w-fit border-0">
                                Get Started Now
							</button>
						</Link>
					</div>
				</div>
			</section>

		
		</div>
	);
};

export default About;
