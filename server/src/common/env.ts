const env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || "localhost",
    SESSION_SECRET: process.env.SESSION_SECRET || "your-secret-key",
    DB_TYPE: process.env.DB_TYPE || "postgres",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 5432,
    DB_USER: process.env.DB_USER || "postgres",
    DB_PASSWORD: process.env.DB_PASSWORD || "postgrespass",
    DB_NAME: process.env.DB_NAME || "postgres",
    DB_SCHEMA: process.env.DB_SCHEMA || "taskmanage",
};

export default env;
