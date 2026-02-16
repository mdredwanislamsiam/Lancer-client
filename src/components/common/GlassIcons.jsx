import { FaSpider } from "react-icons/fa";

const gradientMapping = {
	blue: "linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))",
	purple: "linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))",
	red: "linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))",
	indigo: "linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))",
	orange: "linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))",
	green: "linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))",
};

const GlassIcons = ({ items, className, categoryServices }) => {
	const getBackgroundStyle = (color) => {
		if (gradientMapping[color]) {
			return { background: gradientMapping[color] };
		}
		return { background: color };
	};

	return (
		<div
			className={`grid gap-[2em] md:gap-[5em] grid-cols-2 md:grid-cols-5 mx-auto py-[3em] space-y-5 overflow-visible ${className || ""}`}>
			{categoryServices.map((category, index) => (
				<button
					key={index}
					type="button"
					aria-label={category.category.name}
					className={`relative bg-transparent outline-none mx-auto border-none cursor-pointer w-[12em] h-[10em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] shadow-xl rounded-full group `}>
					<span
						className="absolute top-0 left-0 w-full h-full rounded-[1.25em] block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[0deg] [will-change:transform] group-hover:[transform:rotate(0deg)_translate3d(0,-1em,0.5em)] bg-linear-to-br from-[#013050] to-[#59abef85]"
						style={{
							boxShadow: "0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)",
						}}></span>

					<span
						className="absolute top-0 left-0 w-full h-full rounded-[1.25em] bg-[hsla(0,0%,100%,0.15)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] [-moz-backdrop-filter:blur(0.75em)] [will-change:transform] transform group-hover:[transform:translate3d(0,0,2em)]"
						style={{
							boxShadow: "0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset",
						}}>
						<span
							className="m-auto w-[1.5em] h-[1.5em] flex items-center justify-center text-xl font-bold"
							aria-hidden="true">
							{category.category.name}
						</span>
					</span>

					<span className="absolute top-full left-0 right-0 text-center whitespace-nowrap leading-[3] text-base opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 hover:[transform:translateY(20%)]">
						{category.category.name}
					</span>
					<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 text-center opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]">
						<div className="origin-bottom translate-y-full transition-transform duration-700 ease-out group-hover:translate-y-0">
							<div className="bg-white/90 backdrop-blur-md shadow-lg rounded-xl p-4 w-[16em] max-w-xs text-sm leading-relaxed">
								<ul>
									{category.services.map((s) => (
										<li key={s.id} className="bg-amber-200 px-5 py-2 rounded-sm mt-1 shadow-sm">
											{s.title}
										</li>
									))}
								</ul>
							</div>
							<div className="w-3 h-3 rounded-full bg-linear-to-br from-[#032583] to-[#9daebc85] mx-auto "></div>
							<div className="w-1 h-8 bg-linear-to-b from-[#013050] to-[#dbe0e485] mx-auto "></div>
						</div>
					</div>
				</button>
			))}
		</div>
	);
};

export default GlassIcons;
