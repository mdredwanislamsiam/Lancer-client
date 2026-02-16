import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuthContext from '../hooks/useAuthContext';
import { Link, useNavigate } from 'react-router';
import ErrorAlert from '../components/alerts/ErrorAlert';

const Register = () => {
	const { registerUser, errorMsg } = useAuthContext(); 
	const [previewImage, setPreviewImage] = useState([]);
	const [image, setImage] = useState([]);
	const [loading, setLoading] = useState(false); 
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const navigate = useNavigate(); 
	

	const handleImageChange = (e) => {
		console.log(e); 
		const files = Array.from(e.target.files);
		setImage(files);
		console.log(files); 
		setPreviewImage(files.map((file) => URL.createObjectURL(file)));
	}; 

	console.log(previewImage); 
	const onSubmit = async (data) => {
		const formData = new FormData();
		formData.append("username", data.username);
		formData.append("first_name", data.first_name);
		formData.append("last_name", data.last_name);
		formData.append("email", data.email);
		formData.append("address", data.address);
		formData.append("phone_number", data.phone_number);
		formData.append("password", data.password);
		formData.append("bio", data.bio);
		formData.append("role", data.role);
		if (data.image && data.image[0]) {
			formData.append("image", data.image[0]);
		}
		console.log(formData)
		setLoading(true); 
        delete data.confirm_password; 
        try {
			const response = await registerUser(formData);
			if (response.success) {
				navigate("/login", { state: { response: response } });
			}
		} catch (error) {
			console.log("Registration failed: ", error);
		}
		finally {
			setLoading(false); 
		}
    }

    return (
		<div className="flex min-h-screen items-center justify-center px-4 py-12 bg-gradient-to-br from-[#1B262C] to-[#236589]">
			<div className="card w-full max-w-md bg-gradient-to-t from-[#3282B8] shadow-xl">
				<div className="card-body">
					<h2 className="card-title text-2xl font-bold text-white">Sign Up</h2>
					<p className="text-white/70"> Create an account to get started</p>
					{errorMsg && <ErrorAlert err={errorMsg} />}
					<form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
						{/* UserName */}
						<div className="form-control">
							<label htmlFor="username" className="label">
								<span className="label-text text-white/80">Username</span>
							</label>
							<input
								id="username"
								type="text"
								placeholder="Username"
								className="input input-bordered w-full outline-none"
								{...register("username", { required: "Username is required" })}
							/>
							{errors.username && (
								<span className="label-text-alt text-error">{errors.username.message}</span>
							)}
						</div>
						{/* First Name */}
						<div className="form-control">
							<label htmlFor="first_name" className="label">
								<span className="label-text text-white/80">First Name</span>
							</label>
							<input
								id="first_name"
								type="text"
								placeholder="First Name"
								className="input input-bordered w-full outline-none"
								{...register("first_name", { required: "First Name is required" })}
							/>
							{errors.first_name && (
								<span className="label-text-alt text-error">{errors.first_name.message}</span>
							)}
						</div>
						{/* Last Name */}
						<div className="form-control">
							<label htmlFor="last_name" className="label">
								<span className="label-text text-white/80">Last Name</span>
							</label>
							<input
								id="last_name"
								type="text"
								placeholder="Last Name"
								className="input input-bordered w-full outline-none"
								{...register("last_name", { required: "Last Name is required" })}
							/>
							{errors.last_name && (
								<span className="label-text-alt text-error">{errors.last_name.message}</span>
							)}
						</div>
						{/* Email */}
						<div className="form-control">
							<label htmlFor="email" className="label">
								<span className="label-text text-white/80">Email</span>
							</label>
							<input
								id="email"
								type="email"
								placeholder="name@example.com"
								className="input input-bordered w-full outline-none"
								{...register("email", { required: "Eamil is required" })}
							/>
							{errors.email && <span className="label-text-alt text-error">{errors.email.message}</span>}
						</div>
						{/* Address */}
						<div className="form-control">
							<label htmlFor="address" className="label">
								<span className="label-text text-white/80">Address</span>
							</label>
							<input
								id="address"
								type="text"
								placeholder="Address"
								className="input input-bordered w-full outline-none"
								{...register("address", { required: "Please enter your address to proceed" })}
							/>
						</div>
						{/* Phone_Number */}
						<div className="form-control">
							<label htmlFor="phone_number" className="label">
								<span className="label-text text-white/80">Phone Number</span>
							</label>
							<input
								id="phone_number"
								type="text"
								placeholder="Phone Number"
								className="input input-bordered w-full outline-none"
								{...register("phone_number", {
									pattern: { value: /^\d{8,11}$/, message: "Phone number must be 8 to 11 digits" },
									required: "Please enter your address to proceed",
								})}
							/>
							{errors.phone_number && (
								<span className="label-text-alt text-error">{errors.phone_number.message}</span>
							)}
						</div>
						{/* Password */}
						<div className="form-control">
							<label htmlFor="password" className="label">
								<span className="label-text text-white/80">Password</span>
							</label>
							<input
								id="password"
								type="password"
								placeholder=". . . . . . . . ."
								className="input input-bordered w-full outline-none"
								{...register("password", {
									required: "Password is required",
									minLength: { value: 8, message: "Password must be at least 8 charecters" },
								})}
							/>
							{errors.password && (
								<span className="label-text-alt text-error">{errors.password.message}</span>
							)}
						</div>
						{/* Confirm Password */}
						<div className="form-control">
							<label htmlFor="confirmPassword" className="label">
								<span className="label-text text-white/80">Confirm Password</span>
							</label>
							<input
								id="confirmPassword"
								type="password"
								placeholder=". . . . . . . . ."
								className="input input-bordered w-full outline-none"
								{...register("confirm_password", {
									required: "Confirm password is required",
									validate: (value) => value === watch("password") || "Password do not match!",
								})}
							/>
							{errors.confirm_password && (
								<span className="label-text-alt text-error">{errors.confirm_password.message}</span>
							)}
						</div>
						{/* Bio */}
						<div className="form-control">
							<label htmlFor="bio" className="label">
								<span className="label-text text-white/80">Bio</span>
							</label>
							<input
								id="bio"
								type="text"
								placeholder="Bio"
								className="input input-bordered w-full outline-none"
								{...register("bio")}
							/>
							{errors.bio && <span className="label-text-alt text-error">{errors.bio.message}</span>}
						</div>
						{/* Role */}
						<div className="form-control">
							<label htmlFor="Role" className="label">
								<span className="label-text text-white/80">Role</span>
							</label>
							<select
								name="role"
								id=""
								className="px-5 mx-5 py-1 outline-none border rounded-xl text-white"
								{...register("role")}>
								<option value="Buyer" className="text-black">
									Buyer
								</option>
								<option value="Seller" className="text-black">
									Seller
								</option>
							</select>
						</div>
						{/* Profile Image */}
						<div>
							<label htmlFor="bio" className="label">
								<span className="label-text text-white/80">Profile Image</span>
							</label>
							<input
								id="image"
								type="file"
								accept="image/*"
								className="file-input file-input-bordered w-full"
								onChange={handleImageChange}
								{...register("image")}
							/>
							{previewImage.length > 0 && (
								<div className="flex gap-2 mt-2">
									{previewImage.map((src, index) => (
										<img key={index} src={src} alt="Preview" className="w-20 h-20 my-2" />
									))}
								</div>
							)}
						</div>
						<button
							type="submit"
							className="btn bg-[#BBE1FA] border-0 hover:bg-[#62afe3] w-full"
							disabled={loading}>
							{loading ? "Signing Up..." : "Sign Up"}
						</button>
					</form>
					<div className="text-center mt-4">
						<p className="text-white/70">
							Already have an account?{" "}
							<Link to="/login" className="link text-[#042537] hover:text-[#000000]">
								Sign in
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;