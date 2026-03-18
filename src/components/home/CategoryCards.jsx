import { useEffect, useState, useRef } from "react";
import authAPIClient from "../../services/auth-api-client";
import useCategoriesContext from "../../hooks/useCategoriesContext";
import { Link } from "react-router";

/* ─── tiny icon map (fallback SVGs keyed by category name fragment) ─── */
const ICON_MAP = {
	default: (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
			<rect x="3" y="3" width="7" height="7" rx="1" />
			<rect x="14" y="3" width="7" height="7" rx="1" />
			<rect x="3" y="14" width="7" height="7" rx="1" />
			<rect x="14" y="14" width="7" height="7" rx="1" />
		</svg>
	),
	design: (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
			<circle cx="12" cy="12" r="3" />
			<path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
			<path d="M4.93 4.93l2.12 2.12m9.9 9.9 2.12 2.12M4.93 19.07l2.12-2.12m9.9-9.9 2.12-2.12" />
		</svg>
	),
	develop: (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
			<polyline points="16 18 22 12 16 6" />
			<polyline points="8 6 2 12 8 18" />
		</svg>
	),
	market: (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
			<path d="M22 12h-4l-3 9L9 3l-3 9H2" />
		</svg>
	),
	write: (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
			<path d="M12 20h9" />
			<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
		</svg>
	),
	video: (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
			<polygon points="23 7 16 12 23 17 23 7" />
			<rect x="1" y="5" width="15" height="14" rx="2" />
		</svg>
	),
};

const getIcon = (name = "") => {
	const lc = name.toLowerCase();
	for (const key of Object.keys(ICON_MAP)) {
		if (key !== "default" && lc.includes(key)) return ICON_MAP[key];
	}
	return ICON_MAP.default;
};

/* ─── single category card ─── */
const CategoryCard = ({ category, services = [], index }) => {
	const cardRef = useRef(null);

	useEffect(() => {
		const el = cardRef.current;
		if (!el) return;
		el.style.opacity = "0";
		el.style.transform = "translateY(24px)";
		const t = setTimeout(
			() => {
				el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
				el.style.opacity = "1";
				el.style.transform = "translateY(0)";
			},
			index * 110 + 80,
		);
		return () => clearTimeout(t);
	}, [index]);

	return (
		<div className="">
			<div
				ref={cardRef}
				className="group relative bg-white border border-[#e4e4e4] hover:border-[#306073] transition-all duration-400 overflow-hidden cursor-pointer"
				style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
				{/* teal top bar — grows on hover */}
				<div className="absolute top-0 left-0 right-0 h-[3px] bg-[#306073] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

				{/* card body */}
				<div className="p-7">
					{/* Icon + category name */}
					<div className="flex items-center gap-4 mb-6">
						<div className="w-11 h-11 rounded-full bg-[#f0f6f8] text-[#306073] flex items-center justify-center flex-shrink-0 group-hover:bg-[#306073] group-hover:text-white transition-colors duration-300">
							{getIcon(category.name)}
						</div>
						<h3 className="text-[#0d0d0d] font-bold text-base tracking-tight leading-tight">
							{category.name}
						</h3>
					</div>

					{/* Service list */}
					<ul className="space-y-2 mb-7">
						{services.slice(0, 4).map((svc, i) => (
							<li
								key={svc.id ?? i}
								className="flex items-center gap-2 text-sm text-[#555] group-hover:text-[#222] transition-colors duration-200">
								<span className="w-1 h-1 rounded-full bg-[#306073] flex-shrink-0" />
								<span className="truncate">{svc.title ?? svc.name}</span>
							</li>
						))}
						{services?.length === 0 && (
							<>
								{[...Array(4)].map((_, i) => (
									<li
										key={i}
										className="h-4 rounded bg-[#f0f0f0] animate-pulse"
										style={{ width: `${60 + i * 8}%` }}
									/>
								))}
							</>
						)}
					</ul>

					{/* Footer */}
					<div className="flex items-center justify-between pt-5 border-t border-[#f0f0f0]">
						<span className="text-xs text-[#888] tracking-widest uppercase font-medium">
							{services.length > 0 ? `${services.length}+ services` : "—"}
						</span>
						<span className="flex items-center gap-1 text-xs font-semibold text-[#306073] opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wide">
							Explore
							<svg
								viewBox="0 0 16 16"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								className="w-3 h-3">
								<path d="M3 8h10M9 4l4 4-4 4" />
							</svg>
						</span>
					</div>
				</div>

				{/* subtle corner accent */}
				<div
					className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
					style={{
						background: "radial-gradient(circle at bottom right, rgba(48,96,115,0.08) 0%, transparent 70%)",
					}}
				/>
			</div>
		</div>
	);
};

/* ─── skeleton cards while loading ─── */
const SkeletonCard = () => (
	<div className="bg-white border border-[#e4e4e4] p-7 animate-pulse">
		<div className="flex items-center gap-4 mb-6">
			<div className="w-11 h-11 rounded-full bg-[#f0f0f0]" />
			<div className="h-4 w-32 bg-[#f0f0f0] rounded" />
		</div>
		{[...Array(4)].map((_, i) => (
			<div key={i} className="h-3 bg-[#f5f5f5] rounded mb-2" style={{ width: `${55 + i * 9}%` }} />
		))}
		<div className="mt-7 pt-5 border-t border-[#f0f0f0] h-3 w-20 bg-[#f0f0f0] rounded" />
	</div>
);

/* ─── main component ─── */
const CategoryCards = () => {
	const [fiveCategories, setFiveCategories] = useState([]);
	const { categories } = useCategoriesContext();
	const [categoryServices, setCategoryServices] = useState([]);

	useEffect(() => {
		if (!categories || categories.length === 0) return;
		setFiveCategories(categories.slice(0, 5));
	}, [categories]);

	const fetchFiveServices = async (id) => {
		try {
			const res = await authAPIClient.get(`/categories/five_services/${id}`);
			return res.data;
		} catch (error) {
			console.log(error);
			return [];
		}
	};

	useEffect(() => {
		if (fiveCategories.length === 0) return;
		const fetchServicesForFive = async () => {
			try {
				const servicesData = await Promise.all(fiveCategories.map((cat) => fetchFiveServices(cat.id)));
				setCategoryServices(servicesData);
			} catch (error) {
				console.log(error);
			}
		};
		fetchServicesForFive();
	}, [fiveCategories]);

	const isLoading = fiveCategories.length === 0;

	return (
		<div>
			{/* grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 ">
				{isLoading ?
					[...Array(5)].map((_, i) => <SkeletonCard key={i} />)
				:	fiveCategories.map((cat, i) => (
						<CategoryCard key={cat.id} category={cat} services={categoryServices[i]?.services ?? []} index={i} />
					))
				}
			</div>

			{/* bottom CTA */}
			<div className="flex justify-center mt-12">
				<Link to="/categories">
					<button className="group flex items-center gap-3 border border-[#0d0d0d] px-8 py-3 text-sm font-semibold tracking-widest uppercase text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-white transition-all duration-300">
						Browse All Categories
						<svg
							viewBox="0 0 16 16"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200">
							<path d="M3 8h10M9 4l4 4-4 4" />
						</svg>
					</button>
				</Link>
			</div>
		</div>
	);
};

export default CategoryCards;
