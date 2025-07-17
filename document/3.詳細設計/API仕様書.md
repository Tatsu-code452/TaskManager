# サーバー側処理 詳細設計書（Node.js + Express）

---

## 1. 概要
- 本設計書は、プロジェクト管理統合システムのサーバー側API（Node.js + Express）実装方針・構成・主要処理・エンドポイント仕様をまとめたものです。
- DBはPostgreSQLを前提とし、DB定義書・ER図に準拠。

---

## 2. ディレクトリ構成（例）
```
server/
  server.js                // エントリポイント
  routes/                  // ルーティング
    login.js
    main.js
    projectMaster.js
    task.js
    user.js
    ...
  dao/                     // DBアクセス層
    userDao.js
    projectMasterDao.js
    taskDao.js
    ...
  middleware/              // 共通ミドルウェア
    security.js
  common/                  // 共通処理
    env.js
    constants.js
    alarm.js
```

---

## 3. 共通設計方針
- APIはRESTful設計（GET/POST/PUT/DELETE）
- JWT認証（ログインAPIでトークン発行、以降のAPIはトークン必須）
- エラーハンドリングは共通化（middlewareでcatch）
- 入力値バリデーション（express-validator等）
- DBアクセスはDAO層で集約（SQLインジェクション対策済み）
- ログ出力（アクセス/操作/エラー）

---

## 4. 主要APIエンドポイント設計

### 4.1 ログインAPI
- POST /api/login
  - リクエスト: { userId, password }
  - レスポンス: { token, userInfo }
  - 処理: ユーザ認証、JWT発行

### 4.2 ユーザ管理API
- GET /api/users
  - 全ユーザ一覧取得
- GET /api/users/:id
  - ユーザ詳細取得
- POST /api/users
  - ユーザ新規登録
- PUT /api/users/:id
  - ユーザ情報更新
- DELETE /api/users/:id
  - ユーザ削除

### 4.3 タスク管理API
- GET /api/tasks
  - タスク一覧取得（フィルタ可）
- GET /api/tasks/:id
  - タスク詳細取得
- POST /api/tasks
  - タスク新規登録
- PUT /api/tasks/:id
  - タスク情報更新
- DELETE /api/tasks/:id
  - タスク削除

### 4.4 マスタ管理API
- GET /api/projects
- GET /api/phases
- GET /api/categories
- GET /api/statuses
  - 各マスタ一覧取得
- POST/PUT/DELETE（各マスタのCRUD）

### 4.5 アラーム履歴API
- GET /api/alarms
  - 履歴一覧取得
- GET /api/alarms/:id
  - 履歴詳細取得

---

## 5. 主要処理フロー例

### 5.1 ログイン
1. /api/login へPOST（ID/パスワード）
2. userDaoで認証（パスワードはハッシュ照合）
3. 成功→JWT発行、失敗→401返却

### 5.2 タスク登録
1. /api/tasks へPOST（タスク情報）
2. バリデーション（必須項目・型チェック）
3. taskDaoでINSERT
4. 成功→新規ID返却、失敗→エラー返却

### 5.3 タスク一覧取得
1. /api/tasks へGET（フィルタ条件）
2. taskDaoでSELECT（JOINでマスタ名取得）
3. 結果をJSONで返却

---

## 6. セキュリティ・非機能要件
- JWT認証・認可
- XSS/SQLインジェクション対策
- CSRF対策（APIはトークン必須）
- エラーハンドリング（詳細はログのみ、ユーザには汎用メッセージ）
- ログ出力（アクセス/操作/エラー）
- CORS対応

---

## 7. サンプル：タスク登録API（Express）
```js
// routes/task.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const taskDao = require('../dao/taskDao');

router.post('/tasks',
  [
    body('name').notEmpty(),
    body('project_id').isInt(),
    body('phase_id').isInt(),
    body('category_id').isInt(),
    body('user_id').isInt(),
    body('planned_start_date').isDate(),
    body('planned_end_date').isDate(),
    body('planned_effort').isNumeric(),
    // ...他バリデーション
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newTaskId = await taskDao.createTask(req.body);
      res.status(201).json({ id: newTaskId });
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
```

---

## 8. DAO層サンプル
```js
// dao/taskDao.js
const db = require('./db');
module.exports = {
  async createTask(task) {
    // SQLインジェクション対策済み
    const result = await db.query(
      `INSERT INTO tasks (name, project_id, phase_id, category_id, user_id, planned_start_date, planned_end_date, planned_effort)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
      [task.name, task.project_id, task.phase_id, task.category_id, task.user_id, task.planned_start_date, task.planned_end_date, task.planned_effort]
    );
    return result.rows[0].id;
  },
  // ...他CRUD
};
```

---

