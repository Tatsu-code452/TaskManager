const express = require("express");
const path = require("path");
const { Pool } = require("pg");
const env = require("../common/env");

const router = express.Router();

// PostgreSQL接続プール作成
const pool = new Pool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
});

// ログインAPI（POST）
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "ユーザー名またはパスワードが未入力です",
        });
    }
    try {
        // USERテーブルから認証
        const result = await pool.query(
            `SELECT * FROM "${env.DB_SCHEMA}"."USER" WHERE username = $1 AND password = $2`,
            [username, password]
        );
        if (result.rows.length > 0) {
            // 認証成功: セッション開始
            req.session.user = { username };
            return res.json({ success: true, message: "ログイン成功" });
        } else {
            // 認証失敗
            return res.status(401).json({
                success: false,
                message: "ユーザー名またはパスワードが間違っています",
            });
        }
    } catch (err) {
        console.error("DB認証エラー:", err);
        return res.status(500).json({ success: false, message: "サーバーエラー" });
    }
});

// ログアウト処理
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

module.exports = router;
