import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || "localhost",
    VIEW_PATH: process.env.VIEW_PATH || path.join(__dirname, "../../view/"),
    HTML_PATH: process.env.VIEW_PATH || path.join(__dirname, "../../view/html"),
    SESSION_SECRET: process.env.SESSION_SECRET || "your-secret-key",
    DB_TYPE: process.env.DB_TYPE || "postgres",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 5432,
    DB_USER: process.env.DB_USER || "postgres",
    DB_PASSWORD: process.env.DB_PASSWORD || "postgrespass",
    DB_NAME: process.env.DB_NAME || "postgres",
    DB_SCHEMA: process.env.DB_SCHEMA || "TASK_MANAGE",
};

export default env;
