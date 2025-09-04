import handleAsyncError from "../middlewares/handleAsyncError.js";
import User from "../models/User.js";
import HandleError from "../utils/handleError.js";
import {
  generateTokens,
  verifyRefreshToken,
  setTokenCookies,
  clearTokenCookies,
} from "../utils/authUtils.js";
import { validateRegisterInput, validateLoginInput } from "../utils/validators.js";
import logger from "../utils/logger.js";

export const refreshToken = handleAsyncError(async (req, res, next) => {
  logger.info("Refresh token request initiated");

  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    logger.warn("Refresh token attempt without token");
    return next(new HandleError("Authentication required", 401));
  }

  try {
    const decodedData = verifyRefreshToken(refreshToken);
    const user = await User.findById(decodedData.id);

    if (!user) {
      logger.warn(`User not found for refresh token: ${decodedData.id}`);
      return next(new HandleError("User not found", 404));
    }

    // Check if refresh token is in user's invalidated tokens list
    if (user.invalidatedTokens?.includes(refreshToken)) {
      logger.warn(`Refresh token reuse detected for user: ${user._id}`);
      // Clear all tokens as potential security measure
      clearTokenCookies(res);
      await User.updateOne({ _id: user._id }, { $set: { invalidatedTokens: [] } });
      return next(new HandleError("Security alert: Token reuse detected", 401));
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

    // Invalidate old refresh token
    await User.updateOne(
      { _id: user._id },
      { $push: { invalidatedTokens: refreshToken } }
    );

    // Set new tokens as cookies
    setTokenCookies(res, accessToken, newRefreshToken);

    logger.info(`Token refreshed successfully for user: ${user._id}`);
    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      accessToken, // For clients that prefer to store it in memory
    });
  } catch (error) {
    logger.error(`Refresh token error: ${error.message}`);
    clearTokenCookies(res);
    return next(new HandleError("Invalid or expired refresh token", 401));
  }
});

export const registerUser = handleAsyncError(async (req, res, next) => {
  logger.info("User registration attempt", { email: req.body.email });

  // Validate input
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    logger.warn("Registration validation failed", { errors });
    return next(new HandleError("Validation failed", 400, errors));
  }

  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn("Registration attempt with existing email", { email });
      return next(new HandleError("Email already in use", 400));
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      invalidatedTokens: [],
    });

    logger.info(`New user registered: ${user._id}`);

    // Generate and send tokens
    const { accessToken, refreshToken } = generateTokens(user);
    setTokenCookies(res, accessToken, refreshToken);

    // Omit sensitive data from response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: userResponse,
      accessToken, // For clients that prefer to store it in memory
    });
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    return next(new HandleError("Registration failed", 500));
  }
});

export const Login = handleAsyncError(async (req, res, next) => {
  logger.info("Login attempt", { email: req.body.email });

  // Validate input
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    logger.warn("Login validation failed", { errors });
    return next(new HandleError("Validation failed", 400, errors));
  }

  const { email, password } = req.body;

  try {
    // Get user with password field
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      logger.warn("Login attempt with non-existent email", { email });
      return next(new HandleError("Invalid credentials", 401));
    }

    // Verify password
    const isValidPassword = await user.verifyPassword(password);
    if (!isValidPassword) {
      logger.warn("Invalid password attempt", { email });
      return next(new HandleError("Invalid credentials", 401));
    }

    logger.info(`User logged in: ${user._id}`);

    // Generate and send tokens
    const { accessToken, refreshToken } = generateTokens(user);
    setTokenCookies(res, accessToken, refreshToken);

    // Omit sensitive data from response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userResponse,
      accessToken, // For clients that prefer to store it in memory
    });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    return next(new HandleError("Login failed", 500));
  }
});

export const logout = handleAsyncError(async (req, res, next) => {
  const userId = req.user?._id;
  logger.info(`Logout initiated for user: ${userId}`);

  try {
    // Add current refresh token to invalidated list if user is authenticated
    if (req.user && req.cookies.refreshToken) {
      await User.updateOne(
        { _id: userId },
        { $push: { invalidatedTokens: req.cookies.refreshToken } }
      );
    }

    // Clear cookies
    clearTokenCookies(res);

    logger.info(`User logged out: ${userId}`);
    res.status(200).json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (error) {
    logger.error(`Logout error for user ${userId}: ${error.message}`);
    return next(new HandleError("Logout failed", 500));
  }
});

export const getCurrentUser = handleAsyncError(async (req, res, next) => {
  if (!req.user) {
    return next(new HandleError("Not authenticated", 401));
  }

  const user = await User.findById(req.user.id).select("-password -invalidatedTokens");
  if (!user) {
    return next(new HandleError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});