# コンポーネント Props 設計書（TypeScript＋コメント）

## LoginFormProps
```ts
type LoginFormProps = {
  onSubmit: (userId: string, password: string) => void; // ログイン送信イベント
  errorMessage?: string; // エラーメッセージ（任意）
  isLoading?: boolean;   // ローディング状態（任意）
}
```

---

## MenuButtonProps
```ts
type MenuButtonProps = {
  label: string;               // ボタンラベル
  icon?: React.ReactNode;      // アイコン（任意）
  onClick: () => void;         // クリック時の処理
}
```

---

## TaskFilterFormProps
```ts
type TaskFilterFormProps = {
  filters: {
    projectId?: number;     // プロジェクトID
    phaseId?: number;       // フェーズID
    categoryId?: number;    // カテゴリーID
    userId?: number;        // 担当ユーザーID
    statusId?: number;      // ステータスID
    keyword?: string;       // キーワード検索
  };
  onChange: (filters: TaskFilterFormProps['filters']) => void; // フィルター更新イベント
}
```

---

## TaskListProps
```ts
type TaskListProps = {
  tasks: Task[];                    // タスク一覧
  onEdit: (taskId: number) => void;   // 編集イベント
  onDelete: (taskId: number) => void; // 削除イベント
  onDetail: (taskId: number) => void; // 詳細表示イベント
}
```

---

## TaskDetailModalProps
```ts
type TaskDetailModalProps = {
  task: Task | null;      // 表示するタスク情報
  open: boolean;          // モーダル表示状態
  onClose: () => void;    // モーダルを閉じる処理
}
```

---

## TaskEditFormProps
```ts
type TaskEditFormProps = {
  task?: Task;                    // 編集対象のタスク（新規時はundefined）
  onSubmit: (task: Task) => void; // 送信イベント
  onCancel: () => void;           // キャンセルイベント
}
```

---

## GanttChartProps
```ts
type GanttChartProps = {
  tasks: Task[];                                              // ガントチャート対象のタスク一覧
  onTaskDateChange: (taskId: number, start: Date, end: Date) => void; // 期間変更イベント
  onTaskSelect: (taskId: number) => void;                     // 選択イベント
}
```

---

## UserListProps
```ts
type UserListProps = {
  users: User[];                     // ユーザー一覧
  onEdit: (userId: number) => void; // 編集イベント
  onDelete: (userId: number) => void; // 削除イベント
}
```

---

## UserEditFormProps
```ts
type UserEditFormProps = {
  user?: User;                        // 編集対象ユーザー（新規時はundefined）
  onSubmit: (user: User) => void;     // 送信イベント
  onCancel: () => void;               // キャンセルイベント
}
```

---

## MasterListProps
```ts
type MasterListProps = {
  items: MasterItem[];                         // マスタ項目一覧
  type: 'project' | 'phase' | 'category' | 'status'; // 種別
  onEdit: (id: number) => void;                // 編集イベント
  onDelete: (id: number) => void;              // 削除イベント
}
```

---

## MasterEditFormProps
```ts
type MasterEditFormProps = {
  item?: MasterItem;                      // 編集対象アイテム（新規時はundefined）
  type: 'project' | 'phase' | 'category' | 'status'; // 種別
  onSubmit: (item: MasterItem) => void;   // 送信イベント
  onCancel: () => void;                   // キャンセルイベント
}
```

---

## AlarmListProps
```ts
type AlarmListProps = {
  alarms: Alarm[];                    // アラーム一覧
  onDetail: (alarmId: number) => void; // 詳細表示イベント
}
```

---

## AlarmDetailModalProps
```ts
type AlarmDetailModalProps = {
  alarm: Alarm | null;      // 表示するアラーム（nullで非表示）
  open: boolean;            // モーダル表示状態
  onClose: () => void;      // モーダルを閉じるイベント
}
```

---

## HeaderProps
```ts
type HeaderProps = {
  title: string;                // タイトル表示
  userName: string;            // ログインユーザー名
  onLogout: () => void;        // ログアウト処理
}
```

---

## FooterProps
```ts
type FooterProps = {
  version: string;              // バージョン情報
  copyright: string;            // 著作権表示
}
```

---

## ModalProps
```ts
type ModalProps = {
  open: boolean;                // 表示状態
  onClose: () => void;          // 閉じるイベント
  children: React.ReactNode;   // 描画内容
  title?: string;              // タイトル（任意）
}
```

---

# 共通型定義

---

## Task
```ts
type Task = {
  id: number;               // タスクID
  title: string;            // タスク名
  description?: string;     // 詳細説明（任意）
  startDate: Date;          // 開始日
  endDate: Date;            // 終了日
  projectId?: number;       // 関連プロジェクトID（任意）
  phaseId?: number;         // 関連フェーズID（任意）
  categoryId?: number;      // カテゴリーID（任意）
  userId?: number;          // 担当ユーザーID（任意）
  statusId?: number;        // ステータスID（任意）
  priority?: 'low' | 'medium' | 'high'; // 優先度（任意）
}
```

---

## User
```ts
type User = {
  id: number;             // ユーザーID
  name: string;           // 氏名
  email: string;          // メールアドレス
  role?: string;          // 権限・役割（任意）
  isActive: boolean;      // アクティブ状態
}
```

---

## MasterItem
```ts
type MasterItem = {
  id: number;             // 項目ID
  name: string;           // 項目名
  description?: string;   // 説明（任意）
}
```

---

## Alarm
```ts
type Alarm = {
  id: number;             // アラームID
  title: string;          // アラーム名
  message: string;        // 内容メッセージ
  taskId?: number;        // 関連タスクID（任意）
  dateTime: Date;         // 発火日時
  severity?: 'info' | 'warning' | 'critical'; // 重大度（任意）
}
```

---
