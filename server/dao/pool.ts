import pkg from "../node_modules/@types/pg";
import env from "../common/env";

const { Pool } = pkg;

const pool = new Pool({
    host: env.DB_HOST,
    port: typeof env.DB_PORT === "string" ? parseInt(env.DB_PORT, 10) : env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
});

export default pool;
