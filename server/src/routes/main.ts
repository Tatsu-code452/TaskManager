import path from "path";
import express, { Request, Response, NextFunction } from "express";
import loginRouter from "./login";
import taskRouter from "./task";
import phaseRouter from "./phase";
import projectRouter from "./project";
import statusRouter from "./status";
import userRouter from "./user";
import categoryRouter from "./category";

const router = express.Router();

// 認証＋CSRFチェック用ミドルウェア
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ success: false, message: '未ログインまたはセッション切れ' });
  }
  // CSRFはグローバルで有効なので、トークン不正時は403が自動で返る
  next();
}

// 認証系
router.use('/login', loginRouter);
// タスク系
router.use('/tasks', requireAuth, taskRouter);
// フェーズ系
router.use('/phases', requireAuth, phaseRouter);
// プロジェクト系
router.use('/projects', requireAuth, projectRouter);
// ステータス系
router.use('/statuses', requireAuth, statusRouter);
// ユーザ系
router.use('/users', requireAuth, userRouter);
// カテゴリ系
router.use('/categories', requireAuth, categoryRouter);

// 認証＋CSRFチェックの例（保護API）
router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.json({ success: true, user: req.session.user });
});

// ExpressのRequest型拡張
declare module "express-session" {
  interface SessionData {
    user?: { username: string };
  }
}

// セッション状態確認API（router.useの前に配置）
router.get('/session', (req: Request, res) => {
  res.json({ success: true, user: req.session?.user, csrfToken: res.locals.csrfToken });

  // if (!req.session || !req.session.user) {
  //   return res.status(401).json({ success: false, message: 'セッション切れ' });
  // }
  // res.json({ success: true, user: req.session.user });
});

// どのルートにもマッチしない場合は404エラーを返す
router.use('/', (req, res) => {
  res.status(404).json({ success: false, message: 'Not Found' });
});

export default router;
