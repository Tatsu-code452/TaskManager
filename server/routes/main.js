const path = require('path');
const express = require('express');
const loginRouter = require('./login');
const menuRouter = require('./menu');
const router = express.Router();
const env = require('../common/env');

// 認証系
router.use('/', loginRouter);
// メニュー系
router.use('/', menuRouter);

// ルート
router.get('/', (req, res) => {
  if (!req.session || !req.session.user) {
    return res.redirect('/login');
  }
});

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
