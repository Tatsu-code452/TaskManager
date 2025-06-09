const express = require('express');
const path = require('path');
const applySecurity = require('./middleware/security');
const mainRouter = require('./routes/main');

const app = express();
const PORT = process.env.PORT || 3001;

// セキュリティ系ミドルウェア
applySecurity(app);

// 静的ファイルの配信
app.use(express.static(path.join(__dirname, '../view')));
app.use(express.json()); // JSONデータを解析
app.use(express.urlencoded({ extended: true })); // URLエンコードされたデータを解析

// ルーティング
app.use('/', mainRouter);

// サーバ起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
