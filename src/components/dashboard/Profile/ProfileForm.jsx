import React, { useEffect, useState } from 'react';
import useAuthContext from '../../../hooks/useAuthContext';

const ProfileForm = ({ register, errors, isEditing}) => {
	const [image, setImage] = useState(null);  
	const { user } = useAuthContext(); 

	
	const handleImageChange = (e) => {
		// console.log(e); 
		const file = e.target.files[0]; 
		setImage(URL.createObjectURL(file)); 
	}

	useEffect(() => {
		setImage(user?.image);
	}, [user]); 
 
    return (
		<div className="space-y-4">
			{/* Profile Image */}
			<div className="">
				<img src={image} alt="" className="w-30 h-30 lg:w-40 lg:h-40 shadow-xl mb-5 mx-auto rounded-full object-cover" />
				<input
					type="file"
					accept="image/*"
					disabled = {!isEditing}
					className="file-input file-input-bordered w-full text-xs lg:text-sm"
					{...register("image")}
					onChange={(e) => {
						handleImageChange(e);
					}}
				/>
			</div>

			{/* first_name */}
			<div className="form-control">
				<label htmlFor="" className="label text-xs lg:text-sm">
					First Name
				</label>
				<input
					type="text"
					className="input input-bordered bg-base-200 text-xs lg:text-sm w-full outline-none"
					disabled={!isEditing}
					{...register("first_name", { required: "First name is required" })}
				/>
				{errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}
			</div>
			{/* last_name */}
			<div className="form-control">
				<label htmlFor="" className="label text-xs lg:text-sm">
					Last Name
				</label>
				<input
					type="text"
					className="input input-bordered bg-base-200 text-xs lg:text-sm w-full outline-none"
					disabled={!isEditing}
					{...register("last_name")}
				/>
			</div>
			{/* Email */}
			<div className="form-control">
				<label htmlFor="email" className="label text-xs lg:text-sm ">
					Email Address
				</label>
				<input
					type="email"
					className="input input-bordered bg-base-200 text-xs lg:text-sm w-full outline-none"
					readOnly
					{...register("email", { required: "Eamil is required" })}
				/>
				{errors.email && <p className="text-red-500">{errors.email.message}</p>}
			</div>
			{/* Address */}
			<div className="form-control">
				<label htmlFor="" className="label text-xs lg:text-sm">
					Address
				</label>
				<input
					type="text"
					className="input input-bordered bg-base-200 w-full text-xs lg:text-sm outline-none"
					disabled={!isEditing}
					{...register("address")}
				/>
			</div>
			{/* Phone Number */}
			<div className="form-control">
				<label htmlFor="" className="label text-xs lg:text-sm">
					Phone Number
				</label>
				<input
					type="text"
					className="input input-bordered bg-base-200 w-full text-xs lg:text-sm outline-none"
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
				<label htmlFor="" className="label text-xs lg:text-sm">
					Bio
				</label>
				<textarea
					className="textarea textarea-bordered outline-none bg-base-200 w-full text-xs lg:text-sm min-h-[120px] resize-y"
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