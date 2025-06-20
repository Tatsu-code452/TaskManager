const express = require("express");
const path = require("path");

const router = express.Router();

// ログインAPI（POST）
router.post("/login", async (req, res) => {
    const userDao = require("../dao/userDao"); // ここで毎回require
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "ユーザー名またはパスワードが未入力です",
        });
    }
    try {
        // USERテーブルから認証
        const result = await userDao.find({ username, password });
        if (result.length > 0) {
            req.session.user = { username };
            return res.json({ success: true, message: "ログイン成功" });
        } else {
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
