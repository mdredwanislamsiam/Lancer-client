import { useState } from "react";
import default_img from "../../assets/images/DefaultImage.jpg";
import { Link } from "react-router";
import useServiceContext from "../../hooks/useServiceContext";

/* ─── confirm delete modal ──────────────────────────────────────── */
const DeleteModal = ({ title, onConfirm, onCancel }) => (
	<>
		{/* backdrop */}
		<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4" onClick={onCancel}>
			{/* panel — stop propagation so clicking inside doesn't close */}
			<div className="bg-white w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
				{/* red top bar */}
				<div className="h-[3px] bg-[#b84040]" />

				<div className="p-6">
					{/* icon */}
					<div className="w-11 h-11 rounded-full bg-[#fdf3f3] border border-[#f0c8c8] flex items-center justify-center mb-4">
						<svg viewBox="0 0 20 20" fill="none" stroke="#b84040" strokeWidth="1.6" className="w-5 h-5">
							<polyline points="3 6 5 6 17 6" />
							<path d="M8 6V4h4v2M19 6l-1 12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2L1 6" />
							<line x1="10" y1="11" x2="10" y2="15" />
							<line x1="8" y1="11" x2="8" y2="15" />
							<line x1="12" y1="11" x2="12" y2="15" />
						</svg>
					</div>

					<p className="text-sm font-bold text-[#0d0d0d] mb-1">Delete service?</p>
					<p className="text-xs text-[#888] leading-relaxed">
						<span className="font-semibold text-[#333]">"{title}"</span> will be permanently removed. This
						cannot be undone.
					</p>

					<div className="flex gap-2 mt-6">
						<button
							onClick={onCancel}
							className="flex-1 border border-[#e0e0e0] py-2 text-xs font-semibold tracking-wide text-[#555] hover:border-[#aaa] hover:text-[#0d0d0d] transition-all duration-150">
							Cancel
						</button>
						<button
							onClick={onConfirm}
							className="flex-1 bg-[#b84040] hover:bg-[#962e2e] text-white py-2 text-xs font-semibold tracking-wide transition-colors duration-150">
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	</>
);

/* ─── main card ─────────────────────────────────────────────────── */
const MyServiceCard = ({ service, onDelete }) => {
	const { deleteService } = useServiceContext();
	const [showConfirm, setShowConfirm] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const handleDelete = async () => {
		setDeleting(true);
		await deleteService(service.id);
		if (onDelete) onDelete(service.id);
		setDeleting(false);
		setShowConfirm(false);
	};

	const image = service.images?.length > 0 ? service.images[0].images : default_img;

	return (
		<>
			{showConfirm && (
				<DeleteModal title={service.title} onConfirm={handleDelete} onCancel={() => setShowConfirm(false)} />
			)}

			<div className="group relative bg-[#30373f] border border-[#e4e4e4] hover:border-[#306073] hover:shadow-[0_4px_20px_rgba(48,96,115,0.10)] transition-all duration-300 flex flex-col h-full overflow-hidden rounded-lg">
				{/* animated teal top bar */}
				<div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#306073] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left z-10" />

				{/* thumbnail */}
				<div className="relative overflow-hidden aspect-[4/3] bg-[#f0f0f0] flex-shrink-0">
					<img
						src={image}
						alt={service.title}
						className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>
					{/* price badge */}
					<div className="absolute top-3 right-3 bg-[#0d0d0d] text-white text-xs font-bold px-3 py-1 tracking-wide">
						${service.price}
					</div>
				</div>

				{/* body */}
				<div className="flex flex-col flex-1 p-4 ">
					<h2 className="text-sm font-bold text-[#fbfdfe] leading-snug line-clamp-2 tracking-tight mb-1">
						{service.title}
					</h2>
					<p className="text-xs text-[#e0e3ea] line-clamp-2 leading-relaxed flex-1 italic">
						{service.description}
					</p>

					{/* actions */}
					<div className="flex gap-2 mt-4 pt-4 border-t border-[#77797c]">
						{/* edit */}
						<Link to={`/dashboard/services/update/${service.id}`} className="flex-1">
							<button className="w-full flex items-center justify-center gap-1.5 border border-[#3990b3] text-[#43beee] hover:bg-[#3990b3] hover:text-white text-xs font-semibold tracking-wide py-2 transition-all duration-200">
								<svg
									viewBox="0 0 16 16"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.8"
									className="w-3 h-3">
									<path d="M11.5 2.5a2.121 2.121 0 0 1 3 3L5 15l-4 1 1-4Z" />
								</svg>
								Edit
							</button>
						</Link>

						{/* delete */}
						<button
							onClick={() => setShowConfirm(true)}
							disabled={deleting}
							className="flex-1 flex items-center justify-center gap-1.5 border border-[#f0c8c8] text-[#eb3737] hover:bg-[#b84040] hover:text-white hover:border-[#b84040] text-xs font-semibold tracking-wide py-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
							{deleting ?
								<svg
									viewBox="0 0 16 16"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									className="w-3 h-3 animate-spin">
									<circle cx="8" cy="8" r="6" strokeDasharray="20 8" />
								</svg>
							:	<svg
									viewBox="0 0 16 16"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.8"
									className="w-3 h-3">
									<polyline points="2 4 4 4 14 4" />
									<path d="M5 4V3h6v1M13 4l-.87 9a1 1 0 0 1-1 .9H4.87a1 1 0 0 1-1-.9L3 4" />
								</svg>
							}
							{deleting ? "Deleting…" : "Delete"}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default MyServiceCard;
