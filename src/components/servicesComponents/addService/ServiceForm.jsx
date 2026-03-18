import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useServiceContext from "../../../hooks/useServiceContext";
import useCategoriesContext from "../../../hooks/useCategoriesContext";
import { useState } from "react";

/* ─── field wrapper ─────────────────────────────────────────────── */
const Field = ({ label, error, hint, children }) => (
	<div className="space-y-1.5">
		<label className="text-[10px] font-bold tracking-widest uppercase text-[#888]">{label}</label>
		{children}
		{hint && !error && <p className="text-[10px] text-[#aaa]">{hint}</p>}
		{error && (
			<p className="flex items-center gap-1.5 text-[11px] text-[#b84040] font-medium">
				<svg
					viewBox="0 0 12 12"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					className="w-3 h-3 flex-shrink-0">
					<circle cx="6" cy="6" r="5" />
					<path d="M6 4v2.5M6 8v.5" />
				</svg>
				{error}
			</p>
		)}
	</div>
);

/* ─── shared class helpers ──────────────────────────────────────── */
const inputCls =
	"w-full px-3.5 py-2.5 text-sm border border-[#e0e0e0] focus:border-[#306073] focus:outline-none text-[#0d0d0d] bg-white transition-colors duration-150 placeholder:text-[#ccc]";

const selectCls =
	"w-full px-3.5 py-2.5 text-sm border border-[#e0e0e0] focus:border-[#306073] focus:outline-none text-[#0d0d0d] bg-white transition-colors duration-150 appearance-none cursor-pointer";

/* ─── custom select wrapper ─────────────────────────────────────── */
const SelectWrap = ({ children }) => (
	<div className="relative">
		{children}
		<svg
			viewBox="0 0 12 12"
			fill="none"
			stroke="#888"
			strokeWidth="2"
			className="w-3 h-3 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
			<path d="M2 4l4 4 4-4" />
		</svg>
	</div>
);

/* ─── step indicator ────────────────────────────────────────────── */
const steps = ["Details", "Pricing", "Delivery"];
const StepBar = ({ current }) => (
	<div className="flex items-center gap-0 mb-8">
		{steps.map((label, i) => {
			const done = i < current;
			const active = i === current;
			return (
				<div key={label} className="flex items-center flex-1 last:flex-none">
					<div className="flex flex-col items-center gap-1">
						<div
							className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200 border"
							style={{
								background:
									done ? "#306073"
									: active ? "#fff"
									: "#fafafa",
								borderColor: done || active ? "#306073" : "#e0e0e0",
								color:
									done ? "#fff"
									: active ? "#306073"
									: "#aaa",
							}}>
							{done ?
								<svg
									viewBox="0 0 12 12"
									fill="none"
									stroke="currentColor"
									strokeWidth="2.5"
									className="w-3 h-3">
									<path d="M2 6l3 3 5-5" />
								</svg>
							:	i + 1}
						</div>
						<span
							className="text-[9px] font-bold tracking-widest uppercase whitespace-nowrap"
							style={{
								color:
									active ? "#306073"
									: done ? "#306073"
									: "#bbb",
							}}>
							{label}
						</span>
					</div>
					{i < steps.length - 1 && (
						<div
							className="flex-1 h-px mx-2 mb-4 transition-colors duration-300"
							style={{ background: done ? "#306073" : "#e0e0e0" }}
						/>
					)}
				</div>
			);
		})}
	</div>
);

/* ─── main form ─────────────────────────────────────────────────── */
const ServiceForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
	} = useForm();
	const { categories } = useCategoriesContext();
	const { addService } = useServiceContext();
	const navigate = useNavigate();
	const [step, setStep] = useState(0);
	const [submitting, setSubmitting] = useState(false);

	/* validate current step fields before advancing */
	const stepFields = [
		["category", "title", "description"],
		["price", "service_requirements"],
		["delivery_weeks", "delivery_days", "delivery_hours"],
	];

	const nextStep = async () => {
		const valid = await trigger(stepFields[step]);
		if (valid) setStep((s) => s + 1);
	};

	const handleAddService = async (data) => {
		setSubmitting(true);
		try {
			const res = await addService(data);
			if (res) {
				navigate(`images/${res.serviceId}`, {
					state: { sMsg: "New Service Added Successfully!" },
				});
			}
		} catch (err) {
			console.log(err);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-white">
			<div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
				{/* header */}
				<div className="flex items-center gap-3 mb-6">
					<span className="w-px h-6 bg-[#306073]" />
					<div>
						<h1 className="text-lg font-extrabold text-[#0d0d0d] tracking-tight leading-none">
							Add New Service
						</h1>
						<p className="text-xs text-[#888] mt-0.5">Fill in the details to list your service</p>
					</div>
				</div>

				{/* step bar */}
				<StepBar current={step} />

				<form onSubmit={handleSubmit(handleAddService)}>
					<div className="bg-white border border-[#e8e8e8]">
						{/* teal top accent */}
						<div className="h-[3px] bg-[#306073]" />

						<div className="p-6 space-y-5">
							{/* ── Step 0: Details ── */}
							{step === 0 && (
								<>
									<Field label="Category" error={errors.category?.message}>
										<SelectWrap>
											<select
												className={selectCls}
												{...register("category", { required: "Please select a category" })}>
												<option value="">Select a category…</option>
												{categories.map((cat) => (
													<option key={cat.id} value={cat.id}>
														{cat.name}
													</option>
												))}
											</select>
										</SelectWrap>
									</Field>

									<Field label="Service Title" error={errors.title?.message}>
										<input
											type="text"
											placeholder="e.g. Professional Logo Design"
											className={inputCls}
											{...register("title", { required: "Title is required" })}
										/>
									</Field>

									<Field label="Description" error={errors.description?.message}>
										<textarea
											rows={4}
											placeholder="Describe what you offer, your expertise, and what clients will receive…"
											className={`${inputCls} resize-y`}
											{...register("description", { required: "Description is required" })}
										/>
									</Field>
								</>
							)}

							{/* ── Step 1: Pricing ── */}
							{step === 1 && (
								<>
									<Field
										label="Price (USD)"
										error={errors.price?.message}
										hint="Set a competitive price. You can always update it later.">
										<div className="relative">
											<span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#888]">
												$
											</span>
											<input
												type="text"
												placeholder="0.00"
												className={`${inputCls} pl-8`}
												{...register("price", {
													required: "Price is required",
													validate: (v) => !isNaN(parseFloat(v)) || "Enter a valid number",
												})}
											/>
										</div>
									</Field>

									<Field label="Service Requirements" error={errors.service_requirements?.message}>
										<textarea
											rows={5}
											placeholder="What do you need from the buyer to get started? (e.g. brand colours, reference files, project brief…)"
											className={`${inputCls} resize-y`}
											{...register("service_requirements", {
												required: "Requirements are required",
											})}
										/>
									</Field>
								</>
							)}

							{/* ── Step 2: Delivery ── */}
							{step === 2 && (
								<>
									<p className="text-xs text-[#888] leading-relaxed -mt-1">
										Set your estimated delivery time. All three fields are required — enter{" "}
										<span className="font-semibold text-[#333]">0</span> for any that don't apply.
									</p>

									<div className="grid grid-cols-3 gap-3">
										{[
											{ label: "Weeks", key: "delivery_weeks" },
											{ label: "Days", key: "delivery_days" },
											{ label: "Hours", key: "delivery_hours" },
										].map(({ label, key }) => (
											<Field key={key} label={label} error={errors[key]?.message}>
												<input
													type="number"
													defaultValue={0}
													min={0}
													className={inputCls}
													{...register(key, { required: `${label} required` })}
												/>
											</Field>
										))}
									</div>

									{/* delivery summary */}
								</>
							)}
						</div>

						{/* ── footer nav ── */}
						<div className="px-6 pb-6 flex items-center justify-between gap-3 border-t border-[#f0f0f0] pt-5">
							{step > 0 ?
								<button
									type="button"
									onClick={() => setStep((s) => s - 1)}
									className="flex items-center gap-1.5 border border-[#e0e0e0] px-5 py-2.5 text-xs font-semibold text-[#555] hover:border-[#306073] hover:text-[#306073] transition-all duration-200">
									<svg
										viewBox="0 0 16 16"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										className="w-3.5 h-3.5">
										<path d="M13 8H3M7 4l-4 4 4 4" />
									</svg>
									Back
								</button>
							:	<div />}

							{step < steps.length - 1 ?
								<button
									type="button"
									onClick={nextStep}
									className="flex items-center gap-2 bg-[#306073] hover:bg-[#1d4a59] text-white px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-colors duration-200">
									Continue
									<svg
										viewBox="0 0 16 16"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										className="w-3.5 h-3.5">
										<path d="M3 8h10M9 4l4 4-4 4" />
									</svg>
								</button>
							:	<button
									type="submit"
									disabled={submitting}
									className="flex items-center gap-2 bg-[#0d0d0d] hover:bg-[#306073] text-white px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
									{submitting ?
										<>
											<svg
												viewBox="0 0 16 16"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												className="w-3.5 h-3.5 animate-spin">
												<circle cx="8" cy="8" r="6" strokeDasharray="20 8" />
											</svg>
											Publishing…
										</>
									:	<>
											Publish Service
											<svg
												viewBox="0 0 16 16"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												className="w-3.5 h-3.5">
												<path d="M3 8h10M9 4l4 4-4 4" />
											</svg>
										</>
									}
								</button>
							}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ServiceForm;
