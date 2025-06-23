const express = require("express");
const path = require("path");

const router = express.Router();
const alarm = require("../common/alarm");

// ログインAPI（POST）
router.post("/login", async (req, res) => {
    const userDao = require("../dao/userDao"); // ここで毎回require
    const { username, password } = req.body;
    if (!username || !password) {
        return alarm.createBadRequestResponse(
            res,
            "ユーザー名またはパスワードが未入力です"
        );
    }
    try {
        // USERテーブルから認証
        const result = await userDao.find({ username, password });
        if (result.length > 0) {
            req.session.user = { username };
            return alarm.createOkResponse(res, {}, "ログイン成功");
        } else {
            return alarm.createBadRequestResponse(
                res,
                "ユーザー名またはパスワードが未入力です"
            );
        }
    } catch (err) {
        console.error("DB認証エラー:", err);
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// ログアウト処理
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

module.exports = router;
