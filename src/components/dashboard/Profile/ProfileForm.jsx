import React from 'react';

const ProfileForm = ({register, errors, isEditing}) => {
    return (
		<div className="space-y-4">
			{/* first_name */}
			<div className="form-control">
				<label htmlFor="" className="label">
					First Name
				</label>
				<input
					type="text"
					className="input input-bordered bg-base-200 w-full outline-none"
					disabled={!isEditing}
					{...register("first_name", { required: "First name is required" })}
				/>
				{errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}
			</div>
			{/* last_name */}
			<div className="form-control">
				<label htmlFor="" className="label">
					Last Name
				</label>
				<input
					type="text"
					className="input input-bordered bg-base-200 w-full outline-none"
					disabled={!isEditing}
					{...register("last_name")}
				/>
			</div>
			{/* Email */}
			<div className="form-control">
				<label htmlFor="email" className="label">
					Email Address
				</label>
				<input
					type="email"
					className="input input-bordered bg-base-200 w-full outline-none"
					readOnly
					{...register("email", { required: "Eamil is required" })}
				/>
				{errors.email && <p className="text-red-500">{errors.email.message}</p>}
			</div>
			{/* Address */}
			<div className="form-control">
				<label htmlFor="" className="label">
					Address
				</label>
				<input
					type="text"
					className="input input-bordered bg-base-200 w-full outline-none"
					disabled={!isEditing}
					{...register("address")}
				/>
			</div>
			{/* Phone Number */}
			<div className="form-control">
				<label htmlFor="" className="label">
					Phone Number
				</label>
				<input
					type="text"
					className="input input-bordered bg-base-200 w-full outline-none"
					disabled={!isEditing}
					{...register("phone_number", {
						pattern: { value: /^\d{8,11}$/, message: "Phone number must be 8 to 11 digits" },
					})}
				/>
				{errors.phone_number && (
					<span className="label-text-alt text-error">{errors.phone_number.message}</span>
				)}
			</div>
			{/* Bio */}
			<div className="form-control">
				<label htmlFor="" className="label">
					Bio
				</label>
				<textarea
					className="textarea textarea-bordered outline-none bg-base-200 w-full min-h-[120px] resize-y"
					disabled={!isEditing}
					placeholder="Tell clients a bit about yourself…"
					{...register("bio", {
						maxLength: {
							value: 1000,
							message: "Bio must be under 1000 characters!",
						},
					})}
				/>
				{errors.bio && <span className="label-text-alt text-error">{errors.bio.message}</span>}
			</div>
		</div>
	);
};

export default ProfileForm;