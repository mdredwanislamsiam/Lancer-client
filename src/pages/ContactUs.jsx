import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

/* ─── toast ─────────────────────────────────────────────────────── */
const Toast = ({ msg, type }) => {
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

/* ─── field wrapper ─────────────────────────────────────────────── */
const Field = ({ label, error, children }) => (
	<div className="space-y-1.5">
		<label className="text-[10px] font-bold tracking-widest uppercase text-[#888]">{label}</label>
		{children}
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

const inputCls =
	"w-full px-3.5 py-2.5 text-sm border border-[#e0e0e0] focus:border-[#306073] focus:outline-none text-[#0d0d0d] bg-white transition-colors duration-150 placeholder:text-[#ccc]";

/* ─── contact info item ──────────────────────────────────────────── */
const InfoItem = ({ icon, label, value }) => (
	<div className="flex items-start gap-4">
		<div className="w-9 h-9 rounded-lg bg-[#f0f6f8] flex items-center justify-center flex-shrink-0 mt-0.5">
			<svg viewBox="0 0 16 16" fill="none" stroke="#306073" strokeWidth="1.8" className="w-4 h-4">
				{icon}
			</svg>
		</div>
		<div>
			<p className="text-[10px] font-bold tracking-widest uppercase text-[#aaa]">{label}</p>
			<p className="text-sm font-medium text-[#0d0d0d] mt-0.5">{value}</p>
		</div>
	</div>
);

/* ─── main page ─────────────────────────────────────────────────── */
const ContactUs = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const [sending, setSending] = useState(false);
	const [toast, setToast] = useState(null);

	const showToast = (msg, type = "success") => {
		setToast({ msg, type });
		setTimeout(() => setToast(null), 4000);
	};

	const onSubmit = async (data) => {
		setSending(true);
		try {
			await emailjs.send(
				import.meta.env.VITE_EMAILJS_SERVICE_ID,
				import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
				{
					from_name: data.name,
					from_email: data.email,
					subject: data.subject,
					message: data.message,
				},
				import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
			);
			showToast("Message sent! We'll get back to you soon.");
			reset();
		} catch (err) {
			console.error(err);
			showToast("Something went wrong. Please try again.", "error");
		} finally {
			setSending(false);
		}
	};

	return (
		<div className="min-h-screen bg-white">
			{toast && <Toast {...toast} />}

			{/* ── hero strip ── */}
			<div className="border-b border-[#ebebeb]">
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
					<div className="flex items-center gap-3 mb-3">
						<span className="w-px h-6 bg-[#306073]" />
						<span className="text-xs font-bold tracking-widest uppercase text-[#306073]">Get in touch</span>
					</div>
					<h1 className="text-3xl sm:text-5xl font-extrabold text-[#0d0d0d] tracking-tight leading-tight max-w-lg">
						Let's work{" "}
						<span style={{ WebkitTextStroke: "1.5px #306073", color: "transparent" }}>together.</span>
					</h1>
					<p className="text-sm text-[#888] mt-4 max-w-md leading-relaxed">
						Have a project in mind or a question? Fill out the form and we'll get back to you within 24
						hours.
					</p>
				</div>
			</div>

			{/* ── body ── */}
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
					{/* ── left: contact info ── */}
					<div className="lg:col-span-2 space-y-8">
						<div>
							<p className="text-[10px] font-bold tracking-widest uppercase text-[#888] mb-5">
								Contact Info
							</p>
							<div className="space-y-5">
								<InfoItem
									icon={<path d="M2 4l6 4 6-4M2 4h12v9H2z" />}
									label="Email"
									value="hello@yourdomain.com"
								/>
								<InfoItem
									icon={
										<>
											<path d="M8 1C5.2 1 3 3.2 3 6c0 3.9 5 9 5 9s5-5.1 5-9c0-2.8-2.2-5-5-5z" />
											<circle cx="8" cy="6" r="1.5" />
										</>
									}
									label="Location"
									value="Dhaka, Bangladesh"
								/>
								<InfoItem
									icon={<path d="M3 3h10v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3zm3 0V2h4v1" />}
									label="Working hours"
									value="Sun – Thu, 9am – 6pm"
								/>
							</div>
						</div>

						{/* divider */}
						<div className="border-t border-[#f0f0f0]" />

						{/* social links */}
						<div>
							<p className="text-[10px] font-bold tracking-widest uppercase text-[#888] mb-4">Socials</p>
							<div className="flex gap-3">
								{[
									{
										label: "LinkedIn",
										path: "M2 2h3v12H2zM3.5 1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM7 6c0-1 .8-2 2.5-2S12 4.8 12 7v7h-3V7.5c0-.8-.5-1.5-1.5-1.5S7 6.7 7 7.5V14H4V6z",
									},
									{
										label: "Twitter",
										path: "M15 3a6 6 0 0 1-1.9.5 3.3 3.3 0 0 0 1.5-1.8 6.5 6.5 0 0 1-2.1.8A3.3 3.3 0 0 0 7.8 5c0 .3 0 .5.1.7A9.4 9.4 0 0 1 1 3.7a3.3 3.3 0 0 0 1 4.4 3.3 3.3 0 0 1-1.5-.4v.1a3.3 3.3 0 0 0 2.6 3.2 3.3 3.3 0 0 1-1.5.1 3.3 3.3 0 0 0 3.1 2.3A6.6 6.6 0 0 1 1 14.5a9.3 9.3 0 0 0 5 1.5c6.1 0 9.4-5 9.4-9.4v-.4A6.7 6.7 0 0 0 17 4.3 6.5 6.5 0 0 1 15 3z",
									},
									{
										label: "GitHub",
										path: "M8 1C4.1 1 1 4.1 1 8c0 3.1 2 5.7 4.8 6.6.4.1.5-.2.5-.4v-1.4c-2 .4-2.5-.5-2.7-1 0-.1-.5-.9-.9-1.1-.3-.2-.7-.6 0-.6.7 0 1.1.6 1.3 1 .5.7 1.2.9 1.5.7.1-.5.3-.9.5-1.1-1.7-.2-3.4-.8-3.4-3.7 0-.8.3-1.5.8-2-.1-.2-.4-1 .1-2.1 0 0 .6-.2 2.1.8a7 7 0 0 1 3.8 0c1.5-1 2.1-.8 2.1-.8.5 1.1.2 1.9.1 2.1.5.5.8 1.2.8 2 0 2.9-1.8 3.5-3.4 3.7.3.2.5.7.5 1.5v2.2c0 .2.1.5.5.4A7 7 0 0 0 15 8c0-3.9-3.1-7-7-7z",
									},
								].map(({ label, path }) => (
									<button
										key={label}
										className="w-9 h-9 border border-[#e4e4e4] hover:border-[#306073] flex items-center justify-center transition-colors duration-200 group"
										aria-label={label}>
										<svg
											viewBox="0 0 16 16"
											fill="none"
											stroke="#888"
											strokeWidth="1.5"
											className="w-4 h-4 group-hover:stroke-[#306073] transition-colors">
											<path d={path} />
										</svg>
									</button>
								))}
							</div>
						</div>
					</div>

					{/* ── right: form ── */}
					<div className="lg:col-span-3">
						<div className="bg-white border border-[#e8e8e8]">
							<div className="h-[3px] bg-[#306073]" />

							<form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-5">
								{/* name + email row */}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<Field label="Your Name" error={errors.name?.message}>
										<input
											type="text"
											placeholder="John Doe"
											className={inputCls}
											{...register("name", { required: "Name is required" })}
										/>
									</Field>

									<Field label="Email Address" error={errors.email?.message}>
										<input
											type="email"
											placeholder="john@example.com"
											className={inputCls}
											{...register("email", {
												required: "Email is required",
												pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
											})}
										/>
									</Field>
								</div>

								{/* subject */}
								<Field label="Subject" error={errors.subject?.message}>
									<input
										type="text"
										placeholder="What's this about?"
										className={inputCls}
										{...register("subject", { required: "Subject is required" })}
									/>
								</Field>

								{/* message */}
								<Field label="Message" error={errors.message?.message}>
									<textarea
										rows={6}
										placeholder="Tell us about your project or question…"
										className={`${inputCls} resize-y`}
										{...register("message", {
											required: "Message is required",
											minLength: { value: 20, message: "Please write at least 20 characters" },
										})}
									/>
								</Field>

								{/* submit */}
								<button
									type="submit"
									disabled={sending}
									className="w-full flex items-center justify-center gap-2 bg-[#306073] hover:bg-[#1d4a59] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold tracking-widest uppercase py-3.5 transition-colors duration-200">
									{sending ?
										<>
											<svg
												viewBox="0 0 16 16"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												className="w-3.5 h-3.5 animate-spin">
												<circle cx="8" cy="8" r="6" strokeDasharray="20 8" />
											</svg>
											Sending…
										</>
									:	<>
											Send Message
											<svg
												viewBox="0 0 16 16"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												className="w-3.5 h-3.5">
												<path d="M1 8h11M8 4l4 4-4 4" />
											</svg>
										</>
									}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
