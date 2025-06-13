import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT || "5002";
export const jwtSecret = process.env.JWT_SECRET || "defaultSecret";
