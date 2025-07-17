# DB定義書

## ユーザテーブル

テーブル情報
| 項目           | 値                                     |
| -------------- | -------------------------------------- |
| 論理テーブル名 | ユーザテーブル                         |
| 物理テーブル名 | users（※userは予約語のため変更を推奨） |


カラム情報
| No  | 論理名     | 物理名     | データ型     | キー | NOT NULL | デフォルト        | 備考                  |
| --- | ---------- | ---------- | ------------ | ---- | -------- | ----------------- | --------------------- |
| 1   | ID         | id         | serial       | PK   | ○        | -                 | ユーザ識別子          |
| 2   | パスワード | password   | varchar(100) |      | ○        | -                 | ハッシュ化推奨        |
| 3   | 名称       | name       | varchar(256) |      | ○        | -                 | ユーザ表示名          |
| 4   | 権限       | role       | char(1)      |      | ○        | -                 | 管理者＝A、一般＝U 等 |
| 5   | 作成日時   | created_at | timestamp(6) |      | ○        | CURRENT_TIMESTAMP |                       |
| 6   | 更新日時   | updated_at | timestamp(6) |      | ○        | CURRENT_TIMESTAMP |                       |
  
## タスクテーブル

テーブル情報
| 項目           | 値             |
| -------------- | -------------- |
| 論理テーブル名 | タスクテーブル |
| 物理テーブル名 | tasks          |

カラム情報
| No  | 論理名       | 物理名             | データ型     | キー | NOT NULL | デフォルト        | 備考                         |
| --- | ------------ | ------------------ | ------------ | ---- | -------- | ----------------- | ---------------------------- |
| 1   | ID           | id                 | serial       | PK   | ○        | -                 | タスク識別子                 |
| 2   | 名称         | name               | varchar(256) |      | ○        | -                 |                              |
| 3   | 案件ID       | project_id         | integer      | FK   | ○        | -                 | → projects.id                |
| 4   | フェーズID   | phase_id           | integer      | FK   | ○        | -                 | → phases.id                  |
| 5   | カテゴリID   | category_id        | integer      | FK   | ○        | -                 | → categories.id              |
| 6   | ユーザID     | user_id            | integer      | FK   | ○        | -                 | → users.id                   |
| 7   | 予定開始日   | planned_start_date | date         |      | ○        | -                 |                              |
| 8   | 予定終了日   | planned_end_date   | date         |      | ○        | -                 |                              |
| 9   | 予定工数     | planned_effort     | numeric(5,2) |      | ○        | -                 | 単位：時間（例：1.5h）       |
| 10  | 実績開始日   | actual_start_date  | date         |      |          | -                 |                              |
| 11  | 実績終了日   | actual_end_date    | date         |      |          | -                 |                              |
| 12  | 実績工数     | actual_effort      | numeric(5,2) |      |          | -                 | status.id                    |
| 13  | ステータスID | status_id          | integer      | FK   | ○        | -                 | ステータス管理IDなど         |
| 14  | 進捗率       | progress_rate      | numeric(3,1) |      | ○        | 0.0               | 単位：パーセント（例：75.0） |
| 15  | 優先度       | priority           | integer      |      | ○        | -                 | 優先度管理用                 |
| 16  | 前タスクID   | pre_task_id        | integer      |      |          | -                 | 自己結合（FK）               |
| 17  | 次タスクID   | next_task_id       | integer      |      |          | -                 | 自己結合（FK）               |
| 18  | 作成日時     | created_at         | timestamp(6) |      | ○        | CURRENT_TIMESTAMP |                              |
| 19  | 更新日時     | updated_at         | timestamp(6) |      | ○        | CURRENT_TIMESTAMP |                              |

## 案件マスタ

テーブル情報
| 項目           | 値         |
| -------------- | ---------- |
| 論理テーブル名 | 案件マスタ |
| 物理テーブル名 | projects   |

カラム情報
| No  | 論理名   | 物理名     | データ型     | キー | NOT NULL | デフォルト        | 備考       |
| --- | -------- | ---------- | ------------ | ---- | -------- | ----------------- | ---------- |
| 1   | ID       | id         | serial       | PK   | ○        | -                 | 案件識別子 |
| 2   | 名称     | name       | varchar(256) |      | ○        | -                 | 案件名     |
| 3   | 開始日   | start_date | date         |      |          | -                 | 任意入力   |
| 4   | 終了日   | end_date   | date         |      |          | -                 | 任意入力   |
| 5   | 作成日時 | created_at | timestamp(6) |      | ○        | CURRENT_TIMESTAMP |            |
| 6   | 更新日時 | updated_at | timestamp(6) |      | ○        | CURRENT_TIMESTAMP |            |

## フェーズマスタ

テーブル情報
| 項目           | 値             |
| -------------- | -------------- |
| 論理テーブル名 | フェーズマスタ |
| 物理テーブル名 | phases         |


カラム情報
| No  | 論理名   | 物理名     | データ型     | キー | NOT NULL | デフォルト        | 備考           |
| --- | -------- | ---------- | ------------ | ---- | -------- | ----------------- | -------------- |
| 1   | ID       | id         | serial       | PK   | ○        | -                 | フェーズID     |
| 2   | 名称     | name       | varchar(100) |      | ○        | -                 |                |
| 3   | 表示順   | sort_no    | integer      |      |          | -                 | 任意の順序指定 |
| 4   | 作成日時 | created_at | timestamp(6) |      | ○        | CURRENT_TIMESTAMP |                |
| 5   | 更新日時 | updated_at | timestamp(6) |      | ○        | CURRENT_TIMESTAMP |                |


## カテゴリマスタ

テーブル情報
| 項目           | 値             |
| -------------- | -------------- |
| 論理テーブル名 | カテゴリマスタ |
| 物理テーブル名 | categories     |


カラム情報
| No  | 論理名   | 物理名     | データ型     | キー | NOT NULL | デフォルト        | 備考       |
| --- | -------- | ---------- | ------------ | ---- | -------- | ----------------- | ---------- |
| 1   | ID       | id         | serial       | PK   | ○        | -                 | カテゴリID |
| 2   | 名称     | name       | varchar(100) |      | ○        | -                 |            |
| 3   | 作成日時 | created_at | timestamp(6) |      | ○        | CURRENT_TIMESTAMP |            |
| 4   | 更新日時 | updated_at | timestamp(6) |      | ○        | CURRENT_TIMESTAMP |            |

## ステータスマスタ

テーブル情報
| 項目           | 値               |
| -------------- | ---------------- |
| 論理テーブル名 | ステータスマスタ |
| 物理テーブル名 | statuses         |


カラム情報
| No  | 論理名   | 物理名     | データ型     | キー | NOT NULL | デフォルト        | 備考               |
| --- | -------- | ---------- | ------------ | ---- | -------- | ----------------- | ------------------ |
| 1   | ID       | id         | serial       | PK   | ○        | -                 | ステータスID       |
| 2   | 名称     | name       | varchar(50)  |      | ○        | -                 | 表示名など         |
| 3   | 色コード | color      | varchar(7)   |      |          | -                 | UI表示用 (#RRGGBB) |
| 4   | 作成日時 | created_at | timestamp(6) |      | ○        | CURRENT_TIMESTAMP |                    |
| 5   | 更新日時 | updated_at | timestamp(6) |      | ○        | CURRENT_TIMESTAMP |                    |












