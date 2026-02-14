import { successResponse, throwError } from "../../common/index.js";
import { dbRepository } from "../../db/index.js";
import { UserModel } from "../../db/index.js";
import * as userService from "./user.service.js";

export const signupController = async (req, res, next) => {
  try {
    const user = await userService.signup(req.body);
    return successResponse({
      res,
      statusCode: 201,
      message: "user created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const user = await userService.login(req.body);
    return successResponse({
      res,
      statusCode: 200,
      message: "user logged in successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmailController = async (req, res, next) => {
  try {
    const result = await userService.verifyOtp(req.body);
    return successResponse({
      res,
      statusCode: 200,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshTokenController = async (req, res, next) => {
  try {
    const result = await userService.refreshToken(req.headers.token);
    return successResponse({
      res,
      statusCode: 200,
      message: "Token refreshed successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadProfilePicController = async (req, res, next) => {
  try {
    if (!req.file) {
      return throwError("Please upload an image", 400);
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.path.replace(/\\/g, "/")}`;
    const user = await dbRepository.updateById(UserModel, req.user._id, { profilePic: imageUrl });

    return successResponse({
      res,
      statusCode: 200,
      message: "Profile picture uploaded successfully",
      data: { imageUrl },
    });
  } catch (error) {
    next(error);
  }
};
export const continueWithGoogleController = async (req, res, next) => {
  try {
    const result = await userService.continueWithGoogle(req.body.idToken);
    return successResponse({
      res,
      statusCode: 200,
      message: "user logged in successfully with Google",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
