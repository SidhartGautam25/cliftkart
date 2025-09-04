import handleAsyncError from "./handleAsyncError.js";
import User from "../models/User.js";
import HandleError from "../utils/handleError.js";
import { verifyAccessToken, verifyRefreshToken } from "../utils/authUtils.js";
import { generateTokens, setTokenCookies } from "../utils/authUtils.js";
import logger from "../utils/logger.js";

export const verifyUser = handleAsyncError(async (req, res, next) => {
  logger.info("Verifying user authentication");
  const { accessToken, refreshToken } = req.cookies;

  // Check if any token exists
  if (!accessToken && !refreshToken) {
    logger.warn("No authentication tokens found");
    return next(new HandleError("Not authenticated, please login to access resources", 401));
  }

  try {
    // Try to verify access token first
    if (accessToken) {
      const decodedData = verifyAccessToken(accessToken);
      logger.info(`Access token valid for user: ${decodedData.id}`);
      
      const user = await User.findById(decodedData.id).select("-invalidatedTokens");
      if (!user) {
        logger.warn(`User not found for valid access token: ${decodedData.id}`);
        return next(new HandleError("User not found", 404));
      }

      req.user = user;
      return next();
    }
  } catch (accessTokenError) {
    logger.info("Access token invalid or expired, attempting refresh");
    
    // If access token is invalid/expired, try refresh token
    if (refreshToken) {
      try {
        const decodedRefreshData = verifyRefreshToken(refreshToken);
        logger.info(`Refresh token valid for user: ${decodedRefreshData.id}`);

        const user = await User.findById(decodedRefreshData.id);
        if (!user) {
          logger.warn(`User not found for valid refresh token: ${decodedRefreshData.id}`);
          return next(new HandleError("User not found", 404));
        }

        // Check if refresh token was invalidated
        if (user.invalidatedTokens?.includes(refreshToken)) {
          logger.warn(`Refresh token reuse detected for user: ${user._id}`);
          // Clear all tokens as security measure
          setTokenCookies(res, null, null);
          return next(new HandleError("Security alert: Token reuse detected", 401));
        }

        // Generate new tokens
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(user);

        // Invalidate old refresh token
        await User.updateOne(
          { _id: user._id },
          { $push: { invalidatedTokens: refreshToken } }
        );

        // Set new cookies
        setTokenCookies(res, newAccessToken, newRefreshToken);

        req.user = user;
        req.tokenRefreshed = true; // Flag to indicate token was refreshed
        logger.info(`Tokens refreshed for user: ${user._id}`);
        return next();
      } catch (refreshTokenError) {
        logger.warn("Refresh token invalid", { error: refreshTokenError.message });
        return next(new HandleError("Session expired, please login again", 401));
      }
    }
  }

  logger.warn("No valid authentication token found");
  return next(new HandleError("No valid authentication token found", 401));
});

export const roleBasedAccess = (allowedRoles) => {
  return handleAsyncError(async (req, res, next) => {
    if (!req.user) {
      logger.warn("Role check attempted without authentication");
      return next(new HandleError("Not authenticated", 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      logger.warn(`User ${req.user._id} attempted unauthorized access to ${allowedRoles} role`);
      return next(
        new HandleError(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }

    logger.info(`Role access granted to ${req.user._id} for ${allowedRoles}`);
    next();
  });
};