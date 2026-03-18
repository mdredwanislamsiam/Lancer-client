import React, { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import authAPIClient from "../services/auth-api-client";

const useAuth = () => {
	const [user, setUser] = useState(null);
	const [errorMsg, setErrorMsg] = useState("");
	const [loading, setLoading] = useState(true);

	const getToken = () => {
		const token = localStorage.getItem("authTokens");
		return token ? JSON.parse(token) : null;
	};
	const [authTokens, setAuthTokens] = useState(getToken);

	// Handle API error — extracts message AND throws so callers can catch
	const handleAPIError = (error, defaultMessage = "Something went wrong!") => {
		let errorMessage = defaultMessage;
		if (error.response?.data) {
			errorMessage = Object.values(error.response.data).flat().join("\n");
		}
		setErrorMsg(errorMessage);
		throw new Error(errorMessage); // ← KEY FIX: throw instead of return
	};

	// Register User
	const registerUser = async (userData) => {
		setErrorMsg("");
		try {
			await apiClient.post("/auth/users/", userData);
			return { success: true, message: "Registration successful. Check your email to activate your account." };
		} catch (error) {
			// registerUser callers expect a return value, not a throw
			if (error.response?.data) {
				const errorMessage = Object.values(error.response.data).flat().join("\n");
				setErrorMsg(errorMessage);
				return { success: false, message: errorMessage };
			}
			setErrorMsg("Registration Failed! Try Again!");
			return { success: false, message: "Registration Failed! Try Again!" };
		}
	};

	// Fetch User
	const fetchUserProfile = async (tokens) => {
		try {
			const response = await apiClient.get("/auth/users/me/", {
				headers: { Authorization: `JWT ${tokens?.access}` },
			});
			setUser(response.data);
		} catch (error) {
			console.error("fetchUserProfile Error:", error.message);
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const checkAuth = async () => {
			if (authTokens) {
				await fetchUserProfile(authTokens);
			} else {
				setLoading(false);
			}
		};
		checkAuth();
	}, []);

	// Login User
	const loginUser = async (userData) => {
		setErrorMsg("");
		try {
			const res = await apiClient.post("/auth/jwt/create/", userData);
			setAuthTokens(res.data);
			localStorage.setItem("authTokens", JSON.stringify(res.data));
			await fetchUserProfile(res.data);
			return { success: true, message: "Login Successful!" };
		} catch (error) {
			// loginUser callers expect a return value too
			if (error.response?.data) {
				const errorMessage = Object.values(error.response.data).flat().join("\n");
				setErrorMsg(errorMessage);
				return { success: false, message: errorMessage };
			}
			setErrorMsg("Login Failed! Try Again!");
			return { success: false, message: "Login Failed! Try Again!" };
		}
	};

	// Logout User
	const logoutUser = () => {
		setAuthTokens(null);
		setUser(null);
		localStorage.removeItem("authTokens");
	};

	// Update Profile — throws on failure so onSubmit catch block fires
	const updateUserProfile = async (data) => {
		setErrorMsg("");
		try {
			const res = await authAPIClient.patch("/auth/users/me/", data);
			await fetchUserProfile(authTokens); // refresh user state after update
			return { success: true, message: "Profile updated successfully!" };
		} catch (error) {
			handleAPIError(error, "Failed to update profile."); // throws
		}
	};

	// Change Password — throws on failure so onSubmit catch block fires
	const changePassword = async (data) => {
		setErrorMsg("");
		try {
			await authAPIClient.post("/auth/users/set_password/", data);
			return { success: true };
		} catch (error) {
			handleAPIError(error, "Password change failed. Please check your current password."); // throws
		}
	};

	return {
		user,
		registerUser,
		authTokens,
		errorMsg,
		loginUser,
		logoutUser,
		updateUserProfile,
		changePassword,
		handleAPIError,
		loading,
	};
};

export default useAuth;
