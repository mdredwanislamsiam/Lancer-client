import React, { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import authAPIClient from "../services/auth-api-client";

const useAuth = () => {
	const [user, setUser] = useState(null);
	const [errorMsg, setErrorMsg] = useState("");

	const getToken = () => {
		const token = localStorage.getItem("authTokens");
		return token ? JSON.parse(token) : null;
	};
	const [authTokens, setAuthTokens] = useState(getToken());

	// Handle API error
	const handleAPIError = (error, defaultMessage = "Something went wrong!") => {
		if (error.response && error.response.data) {
			const errorMessage = Object.values(error.response.data).flat().join("\n");
			setErrorMsg(errorMessage);
			return { success: false, message: errorMessage };
		} else {
			setErrorMsg(defaultMessage);
			return {
				success: false,
				message: defaultMessage,
			};
		}
	};

	// Register User
	const registerUser = async (userData) => {
		setErrorMsg("");
		try {
			await apiClient.post("/auth/users/", userData);
			return { success: true, message: "Registration successful.Check your email to activate your account." };
		} catch (error) {
			return handleAPIError(error, "Registration Failed! Try Again!");
		}
	};

	// Fetch User
	const fetchUserProfile = async () => {
		try {
			const response = await apiClient.get("/auth/users/me/", {
				headers: { Authorization: `JWT ${authTokens?.access}` },
			});
			setUser(response.data);
		} catch (error) {
			console.log("fetchUserProfile Error: ", error.message);
		}
	};
	useEffect(() => {
		if (authTokens) {
			fetchUserProfile();
		}
	}, [authTokens]);

	// Login User
	const loginUser = async (userData) => {
		setErrorMsg("");
		try {
			const res = await apiClient.post("/auth/jwt/create/", userData);
			setAuthTokens(res.data);
			localStorage.setItem("authTokens", JSON.stringify(res.data));
			return { success: true, message: "Login Successfull!" };
		} catch (error) {
			return handleAPIError(error, "Login Failed! Try Again!");
		}
	};

	// Logout User
	const logoutUser = () => {
		setAuthTokens(null);
		setUser(null);
		localStorage.removeItem("authTokens");
	};

	// Update Profile

	const updateUserProfile = async (data) => {
		setErrorMsg("");
		try {
			await authAPIClient.put("/auth/users/me/", data);
		} catch (error) {
			return handleAPIError(error);
		}
	};

	// Change Password

	const changePassword = async (data) => {
		setErrorMsg("");
		try {
			await authAPIClient.post("/auth/users/set_password/", data);
		} catch (error) {
			return handleAPIError(error);
		}
	};

	return { user, registerUser, authTokens, errorMsg, loginUser, logoutUser, updateUserProfile, changePassword };
};

export default useAuth;
