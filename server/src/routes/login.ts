import express from "express";
import path from "path";
import * as alarm from "../common/alarm";
import userDao from "../dao/userDao";

const router = express.Router();

// ExpressのRequest型拡張
import type { Request } from "express";
declare module "express-session" {
  interface SessionData {
    user?: { username: string };
  }
}

// ログインAPI（POST）
router.post("/login", async (req: Request, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return alarm.createBadRequestResponse(
            res,
            "ユーザー名またはパスワードが未入力です"
        );
    }
    try {
        // USERテーブルから認証
        const result = await userDao.find({ name: username, password });
        if (result.length > 0) {
            if (req.session) req.session.user = { username };
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
router.get("/logout", (req: Request, res) => {
    if (req.session) {
        req.session.destroy(() => {
            res.redirect("/login");
        });
    } else {
        res.redirect("/login");
    }
});

export default router;
