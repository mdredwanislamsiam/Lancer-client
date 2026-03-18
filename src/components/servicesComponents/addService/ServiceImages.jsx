import { useEffect, useState, useRef } from "react";
import authAPIClient from "../../../services/auth-api-client";
import { useLocation, useNavigate, useParams } from "react-router";

/* ─── toast ─────────────────────────────────────────────────────── */
const Toast = ({ msg, type = "success" }) => {
	if (!msg) return null;
	const ok = type === "success";
	return (
		<div
			className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 shadow-lg border text-sm font-semibold"
			style={{
				background: ok ? "#f0f8f4" : "#fdf3f3",
				borderColor: ok ? "#b8dfc8" : "#f0c8c8",
				color: ok ? "#2e7d52" : "#b84040",
			}}>
			<svg
				viewBox="0 0 16 16"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				className="w-4 h-4 flex-shrink-0">
				{ok ?
					<>
						<circle cx="8" cy="8" r="7" />
						<path d="M5 8l2 2 4-4" />
					</>
				:	<>
						<circle cx="8" cy="8" r="7" />
						<path d="M8 5v3M8 10v.5" />
					</>
				}
			</svg>
			{msg}
		</div>
	);
};

/* ─── image preview card ─────────────────────────────────────────── */
const PreviewThumb = ({ src, onRemove }) => (
	<div className="relative group w-20 h-20 flex-shrink-0">
		<img src={src} alt="Preview" className="w-full h-full object-cover border border-[#e8e8e8]" />
		<button
			type="button"
			onClick={onRemove}
			className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
			<svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2" className="w-4 h-4 drop-shadow">
				<path d="M3 3l10 10M13 3L3 13" />
			</svg>
		</button>
		<div className="absolute top-1 left-1 bg-[#306073] text-white text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-wider">
			New
		</div>
	</div>
);

/* ─── main component ─────────────────────────────────────────────── */
const ServiceImages = () => {
	const [previewImages, setPreviewImages] = useState([]);
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [toast, setToast] = useState(null);
	const fileInputRef = useRef(null);

	const { serviceId } = useParams();
	const navigate = useNavigate();
	const location = useLocation();

	const showToast = (msg, type = "success") => {
		setToast({ msg, type });
		setTimeout(() => setToast(null), 3000);
	};

	/* show success message passed from ServiceForm navigation */
	useEffect(() => {
		if (location.state?.sMsg) {
			showToast(location.state.sMsg);
		}
	}, [location.state]);

	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
		setImages(files);
		setPreviewImages(files.map((f) => URL.createObjectURL(f)));
	};

	const removePreview = (index) => {
		setImages((prev) => prev.filter((_, i) => i !== index));
		setPreviewImages((prev) => prev.filter((_, i) => i !== index));
	};

	const handleImageUpload = async () => {
		if (!images.length) return showToast("Please select at least one image", "error");
		setLoading(true);
		try {
			for (const image of images) {
				const fd = new FormData();
				fd.append("images", image);
				const res = await authAPIClient.post(`/services/${serviceId}/images/`, fd);
				if (res.status === 201) {
					showToast("Images uploaded! Redirecting…");
					setTimeout(() => navigate("/dashboard"), 1500);
				}
			}
		} catch (error) {
			console.log(error);
			showToast("Upload failed. Please try again.", "error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-white">
			{toast && <Toast msg={toast.msg} type={toast.type} />}

			<div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
				{/* ── header ── */}
				<div className="flex items-center gap-3 mb-8">
					<span className="w-px h-6 bg-[#306073]" />
					<div>
						<h1 className="text-lg font-extrabold text-[#0d0d0d] tracking-tight leading-none">
							Upload Service Images
						</h1>
						<p className="text-xs text-[#888] mt-0.5">Add photos that showcase your service</p>
					</div>
				</div>

				{/* ── card ── */}
				<div className="bg-white border border-[#e8e8e8]">
					<div className="h-[3px] bg-[#306073]" />

					<div className="p-6 space-y-6">
						{/* drop zone */}
						<div
							onClick={() => fileInputRef.current?.click()}
							className="border-2 border-dashed border-[#e0e0e0] hover:border-[#306073] bg-[#fafafa] hover:bg-[#f5f9fa] px-6 py-10 flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-200 group">
							<div className="w-12 h-12 rounded-full bg-white border border-[#e0e0e0] group-hover:border-[#306073] flex items-center justify-center mb-3 transition-colors duration-200">
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="#306073"
									strokeWidth="1.5"
									className="w-6 h-6 opacity-70">
									<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
									<polyline points="17 8 12 3 7 8" />
									<line x1="12" y1="3" x2="12" y2="15" />
								</svg>
							</div>
							<p className="text-sm font-semibold text-[#333]">Click to browse images</p>
							<p className="text-xs text-[#aaa] mt-1">PNG, JPG — multiple files supported</p>
						</div>

						<input
							ref={fileInputRef}
							type="file"
							multiple
							accept="image/*"
							className="hidden"
							onChange={handleImageChange}
						/>

						{/* preview grid */}
						{previewImages.length > 0 && (
							<div>
								<div className="flex items-center justify-between mb-2">
									<p className="text-[10px] font-bold tracking-widest uppercase text-[#888]">
										Selected ({previewImages.length})
									</p>
									<button
										type="button"
										onClick={() => {
											setImages([]);
											setPreviewImages([]);
										}}
										className="text-[10px] text-[#888] hover:text-[#b84040] underline underline-offset-2 transition-colors">
										Clear all
									</button>
								</div>
								<div className="flex flex-wrap gap-2">
									{previewImages.map((src, i) => (
										<PreviewThumb key={i} src={src} onRemove={() => removePreview(i)} />
									))}
								</div>
							</div>
						)}

						{/* upload button */}
						<button
							type="button"
							onClick={handleImageUpload}
							disabled={loading || !images.length}
							className="w-full flex items-center justify-center gap-2 bg-[#306073] hover:bg-[#1d4a59] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold tracking-widest uppercase py-3.5 transition-colors duration-200">
							{loading ?
								<>
									<svg
										viewBox="0 0 16 16"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										className="w-3.5 h-3.5 animate-spin">
										<circle cx="8" cy="8" r="6" strokeDasharray="20 8" />
									</svg>
									Uploading…
								</>
							:	<>
									<svg
										viewBox="0 0 16 16"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										className="w-3.5 h-3.5">
										<path d="M8 2v9M4 6l4-4 4 4M2 13h12" />
									</svg>
									{images.length > 0 ?
										`Upload ${images.length} Image${images.length > 1 ? "s" : ""}`
									:	"Upload Images"}
								</>
							}
						</button>

						{/* skip link */}
						<div className="text-center">
							<button
								type="button"
								onClick={() => navigate("/dashboard")}
								className="text-xs text-[#aaa] hover:text-[#306073] underline underline-offset-2 transition-colors">
								Skip for now — add images later
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServiceImages;
