import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import authAPIClient from "../../../services/auth-api-client";
import CategoryPart from "./formParts/CategoryPart";
import TitlePart from "./formParts/TitlePart";
import DescriptionPart from "./formParts/DescriptionPart";
import PricePart from "./formParts/PricePart";
import ServiceRequirements from "./formParts/ServiceRequirements";
import TimePart from "./formParts/TimePart";
import useServiceContext from "../../../hooks/useServiceContext";
import useCategoriesContext from "../../../hooks/useCategoriesContext";

/* ─── inline toast ──────────────────────────────────────────────── */
const Toast = ({ msg, type = "success" }) => {
	if (!msg) return null;
	const isSuccess = type === "success";
	return (
		<div
			className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 shadow-lg border text-sm font-semibold transition-all duration-300"
			style={{
				background: isSuccess ? "#f0f8f4" : "#fdf3f3",
				borderColor: isSuccess ? "#b8dfc8" : "#f0c8c8",
				color: isSuccess ? "#2e7d52" : "#b84040",
			}}>
			<svg
				viewBox="0 0 16 16"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				className="w-4 h-4 flex-shrink-0">
				{isSuccess ?
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

/* ─── section card ──────────────────────────────────────────────── */
const SectionCard = ({ label, onSave, saving, children }) => (
	<div className="bg-white border border-[#e8e8e8] hover:border-[#c8d8dc] transition-colors duration-200">
		<div className="flex items-center justify-between px-5 py-3 border-b border-[#f0f0f0] bg-[#fafafa]">
			<span className="text-[10px] font-bold tracking-widest uppercase text-[#888]">{label}</span>
			<button
				type="button"
				onClick={onSave}
				disabled={saving}
				className="flex items-center gap-1.5 bg-[#306073] hover:bg-[#1d4a59] disabled:opacity-50 disabled:cursor-not-allowed text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 transition-colors duration-200">
				{saving ?
					<svg
						viewBox="0 0 16 16"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						className="w-3 h-3 animate-spin">
						<circle cx="8" cy="8" r="6" strokeDasharray="20 8" />
					</svg>
				:	<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
						<path d="M2 8l4 4 8-8" />
					</svg>
				}
				{saving ? "Saving…" : "Save"}
			</button>
		</div>
		<div className="px-5 py-4">{children}</div>
	</div>
);

/* ─── image thumbnail ───────────────────────────────────────────── */
const ImageThumb = ({ src, onDelete, isPreview }) => (
	<div className="relative group w-20 h-20 flex-shrink-0">
		<img src={src} alt="" className="w-full h-full object-cover border border-[#e8e8e8]" />
		{!isPreview && (
			<button
				type="button"
				onClick={onDelete}
				className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100">
				<svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2" className="w-4 h-4 drop-shadow">
					<path d="M2 4h12M5 4V3h6v1M11 4l-.7 9H5.7L5 4" />
				</svg>
			</button>
		)}
		{isPreview && (
			<div className="absolute top-1 left-1 bg-[#306073] text-white text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-wider">
				New
			</div>
		)}
	</div>
);

/* ─── main component ────────────────────────────────────────────── */
const UpdateServiceForm = ({ serviceId }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [oldImages, setOldImages] = useState([]);
	const [images, setImages] = useState([]);
	const [previewImages, setPreviewImages] = useState([]);
	const [uploadLoading, setUploadLoading] = useState(false);
	const [savingField, setSavingField] = useState(null); // which field is saving
	const [toast, setToast] = useState(null);
	const fileInputRef = useRef(null);

	const { categories } = useCategoriesContext();
	const { updateService, fetchService, service } = useServiceContext();

	/* show toast then auto-dismiss */
	const showToast = (msg, type = "success") => {
		setToast({ msg, type });
		setTimeout(() => setToast(null), 3000);
	};

	useEffect(() => {
		fetchService(serviceId);
	}, [serviceId]);
	useEffect(() => {
		getImages();
	}, [serviceId]);

	const getImages = async () => {
		try {
			const res = await authAPIClient.get(`/services/${serviceId}/images/`);
			setOldImages(res.data.results);
		} catch (e) {
			console.log(e);
		}
	};

	const parseDeliveryTime = (str) => {
		if (!str) return { delivery_weeks: 0, delivery_days: 0, delivery_hours: 0 };
		const match = str.match(/(\d+)\s+weeks?\s+(\d+)\s+days?\s+(\d+)\s+hours?/i);
		if (!match) return { delivery_weeks: 0, delivery_days: 0, delivery_hours: 0 };
		return {
			delivery_weeks: parseInt(match[1], 10),
			delivery_days: parseInt(match[2], 10),
			delivery_hours: parseInt(match[3], 10),
		};
	};
	const delivery_Time = parseDeliveryTime(service?.delivery_time);

	const handleDeleteImage = async (id) => {
		try {
			await authAPIClient.delete(`/services/${serviceId}/images/${id}/`);
			setOldImages((prev) => prev.filter((img) => img.id !== id));
			showToast("Image deleted");
		} catch (e) {
			console.log(e);
		}
	};

	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
		setImages(files);
		setPreviewImages(files.map((f) => URL.createObjectURL(f)));
	};

	const handleImageUpload = async () => {
		if (!images.length) return showToast("No image selected", "error");
		setUploadLoading(true);
		try {
			for (const image of images) {
				const fd = new FormData();
				fd.append("images", image);
				await authAPIClient.post(`/services/${serviceId}/images/`, fd);
			}
			await getImages();
			setImages([]);
			setPreviewImages([]);
			showToast("Images uploaded successfully");
		} catch (e) {
			console.log(e);
			showToast("Upload failed", "error");
		} finally {
			setUploadLoading(false);
		}
	};

	/* field-level save — saves only relevant keys */
	const saveField = (fieldKeys) => async (formData) => {
		const key = fieldKeys[0];
		setSavingField(key);
		try {
			const cleanData = {
				title: formData.title,
				description: formData.description,
				category: formData.category?.id || formData.category,
				price: formData.price,
				service_requirements: formData.service_requirements,
				delivery_weeks: formData.delivery_weeks ? parseInt(formData.delivery_weeks) : undefined,
				delivery_days: formData.delivery_days ? parseInt(formData.delivery_days) : undefined,
				delivery_hours: formData.delivery_hours ? parseInt(formData.delivery_hours) : undefined,
			};
			const partial = Object.fromEntries(fieldKeys.map((k) => [k, cleanData[k]]).filter(([, v]) => v != null));
			const res = await updateService(serviceId, partial);
			if (res) showToast("Saved successfully");
		} catch (e) {
			console.log(e);
			showToast("Save failed", "error");
		} finally {
			setSavingField(null);
		}
	};

	if (!service) return null;

	return (
		<div className="min-h-screen bg-white">
			{toast && <Toast msg={toast.msg} type={toast.type} />}

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				{/* ── page header ── */}
				<div className="flex items-center gap-3 mb-8">
					<span className="w-px h-6 bg-[#306073]" />
					<div>
						<h1 className="text-lg font-extrabold text-[#0d0d0d] tracking-tight leading-none">
							Edit Service
						</h1>
						<p className="text-xs text-[#888] mt-0.5 truncate max-w-sm">{service.title}</p>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* ── LEFT: image management ── */}
					<div className="space-y-4">
						<div className="flex items-center gap-2.5">
							<span className="w-px h-4 bg-[#306073]" />
							<span className="text-[10px] font-bold tracking-widest uppercase text-[#888]">
								Service Images
							</span>
						</div>

						{/* existing images */}
						{oldImages.length > 0 && (
							<div>
								<p className="text-[10px] text-[#aaa] mb-2 uppercase tracking-widest font-semibold">
									Current ({oldImages.length})
								</p>
								<div className="flex flex-wrap gap-2">
									{oldImages.map((img) => (
										<ImageThumb
											key={img.id}
											src={img.images}
											onDelete={() => handleDeleteImage(img.id)}
										/>
									))}
								</div>
							</div>
						)}

						{/* upload zone */}
						<div
							onClick={() => fileInputRef.current?.click()}
							className="border-2 border-dashed border-[#e0e0e0] hover:border-[#306073] bg-[#fafafa] hover:bg-[#f5f9fa] px-5 py-6 text-center cursor-pointer transition-colors duration-200">
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="#306073"
								strokeWidth="1.5"
								className="w-6 h-6 mx-auto mb-2 opacity-60">
								<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
								<polyline points="17 8 12 3 7 8" />
								<line x1="12" y1="3" x2="12" y2="15" />
							</svg>
							<p className="text-xs font-semibold text-[#555]">Click to select images</p>
							<p className="text-[10px] text-[#aaa] mt-0.5">PNG, JPG — multiple allowed</p>
						</div>
						<input
							ref={fileInputRef}
							type="file"
							multiple
							accept="image/*"
							className="hidden"
							onChange={handleImageChange}
						/>

						{/* new image previews */}
						{previewImages.length > 0 && (
							<div>
								<p className="text-[10px] text-[#aaa] mb-2 uppercase tracking-widest font-semibold">
									To upload ({previewImages.length})
								</p>
								<div className="flex flex-wrap gap-2">
									{previewImages.map((src, i) => (
										<ImageThumb key={i} src={src} isPreview />
									))}
								</div>
							</div>
						)}

						{/* upload button */}
						<button
							type="button"
							onClick={handleImageUpload}
							disabled={uploadLoading || !images.length}
							className="w-full flex items-center justify-center gap-2 bg-[#0d0d0d] hover:bg-[#306073] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold tracking-widest uppercase py-3 transition-colors duration-200">
							{uploadLoading ?
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
									Upload{" "}
									{images.length > 0 ?
										`${images.length} Image${images.length > 1 ? "s" : ""}`
									:	"Images"}
								</>
							}
						</button>
					</div>

					{/* ── RIGHT: field-level save forms ── */}
					<div className="space-y-3">
						<div className="flex items-center gap-2.5">
							<span className="w-px h-4 bg-[#306073]" />
							<span className="text-[10px] font-bold tracking-widest uppercase text-[#888]">
								Service Details
							</span>
						</div>

						<SectionCard
							label="Category"
							saving={savingField === "category"}
							onSave={handleSubmit(saveField(["category"]))}>
							<CategoryPart
								categories={categories}
								defValue={service.category_detail}
								register={register}
								errors={errors}
							/>
						</SectionCard>

						<SectionCard
							label="Title"
							saving={savingField === "title"}
							onSave={handleSubmit(saveField(["title"]))}>
							<TitlePart defValue={service.title} register={register} errors={errors} />
						</SectionCard>

						<SectionCard
							label="Description"
							saving={savingField === "description"}
							onSave={handleSubmit(saveField(["description"]))}>
							<DescriptionPart defValue={service.description} register={register} errors={errors} />
						</SectionCard>

						<SectionCard
							label="Price"
							saving={savingField === "price"}
							onSave={handleSubmit(saveField(["price"]))}>
							<PricePart defValue={service.price} register={register} errors={errors} />
						</SectionCard>
					</div>
				</div>

				{/* ── bottom full-width sections ── */}
				<div className="mt-6 space-y-3">
					<div className="flex items-center gap-2.5">
						<span className="w-px h-4 bg-[#306073]" />
						<span className="text-[10px] font-bold tracking-widest uppercase text-[#888]">
							Additional Details
						</span>
					</div>

					<SectionCard
						label="Service Requirements"
						saving={savingField === "service_requirements"}
						onSave={handleSubmit(saveField(["service_requirements"]))}>
						<ServiceRequirements
							categories={categories}
							defValue={service.service_requirements}
							register={register}
							errors={errors}
						/>
					</SectionCard>

					<SectionCard
						label="Delivery Time"
						saving={savingField === "delivery_weeks"}
						onSave={handleSubmit(saveField(["delivery_weeks", "delivery_days", "delivery_hours"]))}>
						<TimePart
							defWeeks={delivery_Time.delivery_weeks}
							defDays={delivery_Time.delivery_days}
							defHours={delivery_Time.delivery_hours}
							register={register}
							errors={errors}
						/>
					</SectionCard>
				</div>
			</div>
		</div>
	);
};

export default UpdateServiceForm;
