import jwt from "jsonwebtoken";
import { envVars } from "../../../config/config.service.js";

export const generateAccessToken = (payload) => {
    return jwt.sign(payload, envVars.jwt.accessToken.secret, {
        expiresIn: envVars.jwt.accessToken.expiresIn,
    });
};

export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, envVars.jwt.refreshToken.secret, {
        expiresIn: envVars.jwt.refreshToken.expiresIn,
    });
};

export const verifyAccessToken = (token) => {
    return jwt.verify(token, envVars.jwt.accessToken.secret);
};

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, envVars.jwt.refreshToken.secret);
};
