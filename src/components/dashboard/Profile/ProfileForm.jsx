import React, { useEffect, useState } from 'react';
import useAuthContext from '../../../hooks/useAuthContext';


const Field = ({ label, error, locked, children }) => (
	<div className="space-y-1.5">
		<div className="flex items-center justify-between">
			<label className="text-[10px] font-bold tracking-widest uppercase text-[#888]">{label}</label>
			{locked && (
				<span className="flex items-center gap-1 text-[9px] font-semibold tracking-wider uppercase text-[#aaa]">
					<svg
						viewBox="0 0 12 12"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.8"
						className="w-2.5 h-2.5">
						<rect x="2" y="5" width="8" height="6" rx="1" />
						<path d="M4 5V3.5a2 2 0 0 1 4 0V5" />
					</svg>
					Read only
				</span>
			)}
		</div>
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

const ProfileForm = ({ register, errors, isEditing}) => {
	const [image, setImage] = useState(null);  
	const { user } = useAuthContext(); 

	
	const handleImageChange = (e) => {
		// console.log(e); 
		const file = e.target.files[0]; 
		setImage(URL.createObjectURL(file)); 
	}

	const inputCls = (disabled) =>
		`w-full px-3.5 py-2.5 text-sm border transition-colors duration-150 outline-none bg-white ${
			disabled ?
				"border-[#ebebeb] text-[#aaa] bg-[#fafafa] cursor-not-allowed"
			:	"border-[#e0e0e0] text-[#0d0d0d] focus:border-[#306073]"
		}`;

	useEffect(() => {
		setImage(user?.image);
	}, [user]); 
 
    return (
		<div className="space-y-4">
			{/* Profile Image */}
			<div className="">
				<img
					src={image}
					alt=""
					className="w-30 h-30 lg:w-40 lg:h-40 shadow-xl mb-5 mx-auto rounded-full object-cover"
				/>
				<input
					type="file"
					accept="image/*"
					disabled={!isEditing}
					className="file-input file-input-bordered w-full text-xs lg:text-sm"
					{...register("image")}
					onChange={(e) => {
						handleImageChange(e);
					}}
				/>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<Field label="First Name" error={errors.first_name?.message}>
					<input
						type="text"
						className={inputCls(!isEditing)}
						disabled={!isEditing}
						{...register("first_name", { required: "First name is required" })}
					/>
				</Field>

				<Field label="Last Name">
					<input
						type="text"
						className={inputCls(!isEditing)}
						disabled={!isEditing}
						{...register("last_name")}
					/>
				</Field>
			</div>

			{/* ── email (read-only) ── */}
			<Field label="Email Address" error={errors.email?.message} locked>
				<input
					type="email"
					className={inputCls(true)}
					readOnly
					{...register("email", { required: "Email is required" })}
				/>
			</Field>

			{/* ── address + phone row ── */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<Field label="Address">
					<input
						type="text"
						className={inputCls(!isEditing)}
						disabled={!isEditing}
						{...register("address")}
					/>
				</Field>

				<Field label="Phone Number" error={errors.phone_number?.message}>
					<input
						type="text"
						className={inputCls(!isEditing)}
						disabled={!isEditing}
						{...register("phone_number", {
							pattern: {
								value: /^\d{8,11}$/,
								message: "Must be 8–11 digits",
							},
						})}
					/>
				</Field>
			</div>

			{/* ── bio ── */}
			<Field label="Bio" error={errors.bio?.message}>
				<textarea
					className={`${inputCls(!isEditing)} min-h-[120px] resize-y`}
					disabled={!isEditing}
					placeholder={isEditing ? "Tell clients a bit about yourself…" : ""}
					{...register("bio", {
						maxLength: { value: 1000, message: "Bio must be under 1000 characters" },
					})}
				/>
				{isEditing && <p className="text-[10px] text-[#aaa] text-right -mt-1">Max 1000 characters</p>}
			</Field>
		</div>
	);
};

export default ProfileForm;