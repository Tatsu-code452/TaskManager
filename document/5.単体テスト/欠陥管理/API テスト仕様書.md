# Defect（欠陥）API テスト仕様書（Tauri コマンド）

## 1. 対象コマンド
- get_defects
- create_defect
- update_defect
- delete_defect

---

# 2. テストケース

## 2.1 get_defects

| No | 入力 | 期待結果 | チェック |
|----|------|-----------|---------|
| API-D01-01 | project_id=1 | 欠陥一覧が返る | ☐ |
| API-D01-02 | severity=Major | Major のみ返る | ☐ |

---

## 2.2 create_defect

### 正常系

| No | 入力 | 期待結果 | JSON DB | チェック |
|----|------|-----------|----------|---------|
| API-D02-01 | title="入力チェック漏れ" | 201 | 追加される | ☐ |
| API-D02-02 | severity=Major | 201 | severity=Major | ☐ |

### 異常系

| No | 入力 | 期待結果 | JSON DB | チェック |
|----|------|-----------|----------|---------|
| API-D02-03 | title="" | 400 | 追加なし | ☐ |
| API-D02-04 | severity 未選択 | 400 | 追加なし | ☐ |

---

## 2.3 update_defect

| No | 入力 | 期待結果 | JSON DB | チェック |
|----|------|-----------|----------|---------|
| API-D03-01 | status=Fixed | 200 | 更新成功 | ☐ |
| API-D03-02 | 不正 ID | 404 | 更新なし | ☐ |

---

## 2.4 delete_defect

| No | 入力 | 期待結果 | JSON DB | チェック |
|----|------|-----------|----------|---------|
| API-D04-01 | id=1 | 200 | 削除成功 | ☐ |
| API-D04-02 | 不正 ID | 404 | 変更なし | ☐ |
