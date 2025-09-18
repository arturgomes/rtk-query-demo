import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getBaseUrl = () => {
	// Check if we're in development mode
	if (import.meta.env.DEV) {
		// Use environment variable or fallback to local API
		return import.meta.env.VITE_API_URL || "http://localhost:3001";
	}

	// Production - use cloud API or environment variable
	return import.meta.env.VITE_API_URL || "http://localhost:3000";
};

export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: getBaseUrl(),
	}),
	tagTypes: ["Post", "User"],
	endpoints: () => ({}),
});
