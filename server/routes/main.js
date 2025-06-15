const path = require('path');
const express = require('express');
const loginRouter = require('./login');
const menuRouter = require('./menu');
const taskRouter = require('./task');
const projectMasterRouter = require('./projectMaster');
const router = express.Router();
const env = require('../common/env');

// 認証系
router.use('/', loginRouter);
// メニュー系
router.use('/', menuRouter);
// タスク系
router.use('/', taskRouter);
// プロジェクトマスタ系
router.use('/', projectMasterRouter);

// // ルート
// router.get('/', (req, res) => {
//   if (!req.session || !req.session.user) {
//     return res.redirect('/login');
//   }
// });

// セッション状態確認API（router.useの前に配置）
router.get('/session', (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ success: false, message: 'セッション切れ' });
  }
  res.json({ success: true, user: req.session.user });
});

// // 認証チェック（/sessionは除外）
// router.use((req, res, next) => {
//   if (req.path === '/session') return next();
//   if (!req.session || !req.session.user) {
//     return res.redirect('/login');
//   }
//   next();
// });

// 任意のファイルを送信（セキュリティ考慮: view配下のみ許可）
router.get('/:filename', (req, res) => {
  const relPath = req.params.filename;
  const absPath = path.join(env.HTML_PATH, relPath);
  if (!absPath.startsWith(env.VIEW_PATH)) {
    return res.status(403).send('Forbidden');
  }
  res.sendFile(absPath);
});

module.exports = router;
