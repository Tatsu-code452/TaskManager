const path = require('path');
const express = require('express');
const router = express.Router();
const env = require('../common/env');
const { Pool } = require('pg');
// PostgreSQL接続プール作成
const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
});

// ログイン画面
router.get('/login', (req, res) => {
  res.sendFile(path.join(env.HTML_PATH, 'login.html'));
});

// ログイン処理（POST）
router.post('/login', express.urlencoded({ extended: true }), async (req, res) => {
  const { username, password } = req.body;
    if (!username || !password) {
    return res.redirect('/login');
  }

  try {
    // USERテーブルから認証
    const result = await pool.query(
      'SELECT * FROM "USER" WHERE username = $1 AND password = $2',
      [username, password]
    );
    if (result.rows.length > 0) {
      req.session.user = { username };
      return res.redirect('/menu');
    } else {
      return res.redirect('/login');
    }
  } catch (err) {
    console.error('DB認証エラー:', err);
    return res.redirect('/login');
  }
});

// ログアウト処理
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
