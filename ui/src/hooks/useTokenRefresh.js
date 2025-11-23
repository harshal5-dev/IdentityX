import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshAccessToken } from "@/store/authSlice";

/**
 * Custom hook to automatically refresh access token before it expires
 * @param {number} refreshInterval - Time in milliseconds before token expiry to trigger refresh (default: 14 minutes)
 */
export const useTokenRefresh = (refreshInterval = 14 * 60 * 1000) => {
  const dispatch = useDispatch();
  const { user, isRefreshing } = useSelector((state) => state.auth);

  const handleRefresh = useCallback(() => {
    if (user && !isRefreshing) {
      dispatch(refreshAccessToken());
    }
  }, [user, isRefreshing, dispatch]);

  useEffect(() => {
    if (!user) return;

    // Set up interval to refresh token periodically
    const intervalId = setInterval(handleRefresh, refreshInterval);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [user, refreshInterval, handleRefresh]);

  return { handleRefresh };
};

/**
 * Custom hook to handle manual token refresh
 */
export const useManualTokenRefresh = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useSelector((state) => state.auth);

  const refresh = useCallback(() => {
    if (!isRefreshing) {
      return dispatch(refreshAccessToken());
    }
  }, [dispatch, isRefreshing]);

  return { refresh, isRefreshing };
};
