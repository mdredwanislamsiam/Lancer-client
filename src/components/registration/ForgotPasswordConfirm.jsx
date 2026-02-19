import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import apiClient from "../../services/api-client";
import ErrorAlert from "../alerts/ErrorAlert";


const ForgotPasswordConfirm = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const { uid, token } = useParams();
	const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false); 

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		setErrorMsg("");
		setLoading(true);
        delete data.confirm_password;
        // console.log(data); 
		try {
			await apiClient.post("/auth/users/reset_password_confirm/", {uid, token, new_password: data.new_password });
			navigate("/login", {
				state: { message: "Password Reset Successfull!" },
			});
		} catch (error) {
            console.log(error); 
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="flex min-h-screen items-center justify-center px-4 py-12 bg-gradient-to-br from-[#1B262C] to-[#236589]">
			<div className="card w-full max-w-md bg-gradient-to-t from-[#3282B8] shadow-xl">
				<div className="card-body">
					<h2 className="card-title text-white text-2xl font-bold">Reset Password</h2>
					<p className="text-white/80">Set your new password</p>
					{errorMsg && <ErrorAlert err={errorMsg} />}
					<form action="" className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
						<div className="form-control">
							<label htmlFor="new_password" className="label text-white/80">
								<span className="label-text">New Password</span>
							</label>
							<input
								id="new_password"
								type={showPassword ? "text" : "password"}
								placeholder=". . . . . . . . ."
								className="input input-bordered w-full outline-none"
								{...register("new_password", {
									required: "Password is required",
									minLength: { value: 8, message: "Password must be at least 8 charecters" },
								})}
							/>
							{errors.new_password && (
								<span className="label-text-alt text-error">{errors.new_password.message}</span>
							)}
						</div>
						<div className="form-control">
							<label htmlFor="confirmPassword" className="label text-white/80">
								<span className="label-text">Confirm Password</span>
							</label>
							<input
								id="confirmPassword"
								type={showPassword ? "text" : "password"}
								placeholder=". . . . . . . . ."
								className="input input-bordered w-full outline-none"
								{...register("confirm_password", {
									required: "Confirm password is required",
									validate: (value) => value === watch("new_password") || "Password do not match!",
								})}
							/>
							{errors.confirm_password && (
								<span className="label-text-alt text-error">{errors.confirm_password.message}</span>
							)}
						</div>
						<div className="">
							<label htmlFor="" className="label cursor-pointer">
								<span className=" text-white/80">Show Password</span>
								<input
									type="checkbox"
									className="toggle toggle-xs border-0"
									checked={showPassword}
									onChange={() => setShowPassword(!showPassword)}
								/>
							</label>
						</div>
						<button
							type="submit"
							className="btn bg-[#BBE1FA] border-0 hover:bg-[#62afe3] w-full"
							disabled={loading}>
							{loading ? "Saving..." : "Save password"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ForgotPasswordConfirm;
