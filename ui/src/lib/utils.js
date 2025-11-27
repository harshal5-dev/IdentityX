import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const baseQueryWithCredentials = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api",
  credentials: "include",
});

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api",
});
