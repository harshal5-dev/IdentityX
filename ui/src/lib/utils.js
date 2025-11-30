import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api",
  credentials: "include",
});

// Base query with error interceptor
export const baseQuery = async (args, api, extraOptions) => {
  // console.log("BaseQuery Args:", args, extraOptions, api);
  const result = await rawBaseQuery(args, api, extraOptions);

  console.log("BaseQuery Result:", result);

  // Intercept errors
  if (result?.error) {
    const { status, data } = result.error;
    // Handle specific error codes
    if (status === 401) {
      console.log("Unauthorized - Session expired or invalid credentials");
      // You can dispatch logout action here if needed
    } else if (status === 403) {
      console.log("Forbidden - Access denied");
    } else if (status === 500) {
      console.log("Internal Server Error");
    } else if (status === "FETCH_ERROR") {
      console.log("Network Error - Cannot reach server");
    }

    // Transform error to a consistent format
    result.error = {
      status,
      data: {
        errorMessage:
          data?.errorMessage || data?.message || "An error occurred",
        errorCode: data?.errorCode || "UNKNOWN_ERROR",
        validationErrors: data?.validationErrors || null,
        apiPath: data?.apiPath || "",
        statusCode: status,
      },
    };
  }

  return result.data;
};
