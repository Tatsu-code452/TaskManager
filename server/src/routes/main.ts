import path from "path";
import express from "express";
import loginRouter from "./login";
import taskRouter from "./task";
import phaseRouter from "./phase";
import projectRouter from "./project";
import statusRouter from "./status";
import userRouter from "./user";
import categoryRouter from "./category";


const router = express.Router();

// 認証系
router.use('/login', loginRouter);
// タスク系
router.use('/tasks', taskRouter);
// フェーズ系
router.use('/phases', phaseRouter);
// プロジェクト系
router.use('/projects', projectRouter);
// ステータス系
router.use('/statuses', statusRouter);
// ユーザ系
router.use('/users', userRouter);
// カテゴリ系
router.use('/categories', categoryRouter);

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

// どのルートにもマッチしない場合は404エラーを返す
router.use('/', (req, res) => {
  res.status(404).json({ success: false, message: 'Not Found' });
});

export default router;
