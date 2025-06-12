const { Pool } = require("pg");
const env = require("../common/env");

// PostgreSQL接続プール作成
const pool = new Pool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
});

// 他のファイルでも `pool` を使えるようにエクスポート
module.exports = pool;