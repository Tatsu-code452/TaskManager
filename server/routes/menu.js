const path = require('path');
const express = require('express');
const router = express.Router();
const constants = require('../common/env');

// メニュー画面（認証チェック付き）
router.get('/menu', (req, res) => {
  if (!req.session || !req.session.user) {
    return res.redirect('/login');
  }
  res.sendFile(path.join(constants.VIEW_PATH, 'menu.html'));
});

module.exports = router;
