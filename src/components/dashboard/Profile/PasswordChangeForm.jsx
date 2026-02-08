import React, { useState } from 'react';

const PasswordChangeForm = ({ register, errors, watch, isEditing }) => {
    
	const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(); 
	const [showPassword, setShowPassword] = useState(false); 
    return (
		<div>
			<button
				type="button"
				className="btn btn-link p-0 justify-start font-semibold"
				onClick={() => setIsPasswordSectionOpen(!isPasswordSectionOpen)}>
				Change Password
			</button>
			{isPasswordSectionOpen && (
				<div className="mt-3 space-y-3 pl-2 border-l-2 border-base-300">
					<div className="form-control">
						<label htmlFor="" className="label">
							Current Password
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								className="input input-bordered bg-base-200 w-full outline-none pr-10"
								disabled={!isEditing}
								{...register("current_password", { required: "Current Password is required" })}
							/>
						</div>
						{errors.current_password && <p className="text-red-500">{errors.current_password.message}</p>}
					</div>
					<div className="form-control">
						<label htmlFor="" className="label">
							New Password
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								className="input input-bordered bg-base-200 w-full outline-none pr-10"
								disabled={!isEditing}
								{...register("new_password", {
									required: "New Password is required",
									minLength: { value: 8, message: "Password must be at least 8 characters" },
								})}
							/>
						</div>
						{errors.new_password && <p className="text-red-500">{errors.new_password.message}</p>}
					</div>
					<div className="form-control">
						<label htmlFor="" className="label">
							Confirm New Password
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								className="input input-bordered bg-base-200 w-full outline-none pr-10"
								disabled={!isEditing}
								{...register("confirm_new_password", {
									validate: (value) => value === watch("new_password") || "Passwords do not match",
								})}
							/>
						</div>
						{errors.confirm_new_password && (
							<p className="text-red-500">{errors.confirm_new_password.message}</p>
						)}
					</div>

					{/* show Password checkbox */}
					{isEditing && (
						<div className="">
							<label htmlFor="" className="label cursor-pointer">
								<span className="">Show Password</span>
								<input
									type="checkbox"
									className="toggle"
									checked={showPassword}
									onChange={() => setShowPassword(!showPassword)}
								/>
							</label>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default PasswordChangeForm;