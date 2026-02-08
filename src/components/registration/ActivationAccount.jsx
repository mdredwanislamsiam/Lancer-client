import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import apiClient from "../../services/api-client";
import SuccessAlert from "../alerts/SuccessAlert";
import ErrorAlert from "../alerts/ErrorAlert";

const ActivateAccount = () => {
	const { uid, token } = useParams();
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();
    useEffect(() => {
        if (!uid || !token) return;
		apiClient
			.post("/auth/users/activation/", { uid, token })
			.then((res) => {
				setMessage("Account activated successfully!");
				setTimeout(() => navigate("/login"), 3000);
			})
			.catch((error) => {
				setError("Something went Wrong");
				console.log(error);
			});
	}, []);

	return (
		<div className="flex items-center justify-center min-h-screen bg-base-200">
			<div className="card bg-base-100 shadow-xl p-6">
				<h2 className="text-2xl font-bold">Account Activation</h2>
				{message && <SuccessAlert err={message} />}
				{error && <ErrorAlert err={error} />}
			</div>
		</div>
	);
};

export default ActivateAccount;
