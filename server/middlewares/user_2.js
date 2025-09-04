// middlewares/user.js
import handleAsyncError from "./handleAsyncError.js";
import User from "../models/User.js";
import HandleError from "../utils/handleError.js";
import {
  verifyAccessToken,
  verifyRefreshToken,
  generateTokens,
} from "../utils/jwt_2.js";

export const verifyUser = handleAsyncError(async (req, res, next) => {
  console.log("req.cookies is ", req.cookies);
  const { accessToken, refreshToken } = req.cookies;
  console.log("veriyfing user");
  if (!accessToken && !refreshToken) {
    console.log("user has no token available")
    return next(
      new HandleError(
        "Not authenticated, please login to access resources",
        401
      )
    );
  }

  try {
    // Try to verify access token first
    console.log("in the try block of verify user");
    if (!accessToken) {
      throw new Error("No access token available");
    }
    if (accessToken) {
      const decodedData = verifyAccessToken(accessToken);
      console.log("Access token valid, decoded data is ", decodedData);
      req.user = await User.findById(decodedData.id);
      return next();
    }
  } catch (accessTokenError) {
    console.log("Access token invalid or expired, trying refresh token");

    // If access token is invalid/expired, try refresh token
    if (refreshToken) {
      try {
        const decodedRefreshData = verifyRefreshToken(refreshToken);
        console.log("Refresh token valid, generating new tokens");

        const user = await User.findById(decodedRefreshData.id);
        if (!user) {
          return next(new HandleError("User not found", 404));
        }
        console.log("step 1 of verify user");
        // Generate new tokens
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          generateTokens(user);
        console.log("step 2 of verify user");
        // Set new cookies
        const accessTokenOptions = {
          expires: new Date(
            Date.now() + 1*60*1000
              // (process.env.JWT_ACCESS_COOKIE_EXPIRE || 15) * 60 * 1000
          ),
          // expires:'15m',
          httpOnly: true,
          // secure: process.env.NODE_ENV === "production",
          // sameSite: "strict",
        };
        console.log("step 3 of verify user");
        const refreshTokenOptions = {
          expires: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
              // (process.env.JWT_REFRESH_COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000
          ),
          // expires:"7d",
          httpOnly: true,
          // secure: process.env.NODE_ENV === "production",
          // sameSite: "strict",
        };
        console.log("step 4 of verify user");
        console.log("newAccessToken ",newAccessToken);
        console.log("accesssToken option ",accessTokenOptions);
        res.cookie("accessToken", newAccessToken, accessTokenOptions);
        console.log("step 5 of verify user");
        res.cookie("refreshToken", newRefreshToken, refreshTokenOptions);
        console.log("step 6 of verify user");
        req.user = user;
        req.tokenRefreshed = true; // Flag to indicate token was refreshed
        console.log("step 7 of verify user");
        return next();
      } catch (refreshTokenError) {
        console.log("Refresh token also invalid ",refreshTokenError);
        return next(
          new HandleError("Session expired, please login again", 401)
        );
      }
    }
  }

  return next(new HandleError("No valid authentication token found", 401));
});
