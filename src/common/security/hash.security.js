import bcrypt from "bcrypt";
import { envVars } from "../../../config/index.js";


export const hashPassword = async (password) => {
    return await bcrypt.hash(password, Number(envVars.saltRound));
};

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};
