import dotenv from "dotenv";
dotenv.config();


export const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";
export const mongoURL = process.env.MONGO_URL
export const openAIKey = process.env.OPENAI_API_KEY || "your_openai_api_key";
export const port = process.env.PORT || 5000;
export const corsOrigin = process.env.CORS_ORIGIN;