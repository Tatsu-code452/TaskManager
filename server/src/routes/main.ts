import path from "path";
import express from "express";
import loginRouter from "./login";
import taskRouter from "./task";

const router = express.Router();

// 認証系
router.use('/', loginRouter);
// タスク系
router.use('/', taskRouter);

// ExpressのRequest型拡張
import type { Request } from "express";
declare module "express-session" {
  interface SessionData {
    user?: { username: string };
  }
}

// セッション状態確認API（router.useの前に配置）
router.get('/session', (req: Request, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ success: false, message: 'セッション切れ' });
  }
  res.json({ success: true, user: req.session.user });
});

export default router;
