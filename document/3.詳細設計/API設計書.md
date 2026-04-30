# 1. API設計書（REST API）

API の基本方針：

- ベースURL: `/api/v1`
- JSON ベース
- CRUD を統一した命名規則で提供
- Tauri backend でもそのまま使える構造

---

## 1.1 Project（案件）

### ■ GET /projects  
案件一覧取得

**Response**
```json
[
  {
    "id": "p1",
    "name": "案件A",
    "client": "顧客A",
    "status": "active",
    "start_date": "2025-01-01",
    "end_date": "2025-03-31"
  }
]
```

---

### ■ POST /projects  
案件作成

**Request**
```json
{
  "name": "案件A",
  "client": "顧客A",
  "start_date": "2025-01-01",
  "end_date": "2025-03-31"
}
```

---

### ■ GET /projects/{id}  
案件詳細取得

---

### ■ PUT /projects/{id}  
案件更新

---

### ■ DELETE /projects/{id}  
案件削除

---

## 1.2 Milestone（マイルストーン）

### ■ GET /projects/{id}/milestones  
### ■ POST /projects/{id}/milestones  
### ■ PUT /milestones/{id}  
### ■ DELETE /milestones/{id}

---

## 1.3 Phase（フェーズ）

### ■ GET /projects/{id}/phases  
### ■ POST /projects/{id}/phases  
### ■ PUT /phases/{id}  
### ■ DELETE /phases/{id}

---

## 1.4 Task（WBSタスク）

### ■ GET /projects/{id}/tasks  
### ■ GET /phases/{id}/tasks  
### ■ POST /projects/{id}/tasks  
### ■ PUT /tasks/{id}  
### ■ DELETE /tasks/{id}

---

## 1.5 TaskPlanCell（計画工数）

### ■ GET /tasks/{id}/plan  
### ■ PUT /tasks/{id}/plan  
（複数日まとめて更新）

**Request**
```json
[
  { "date": "2025-01-01", "hours": 2 },
  { "date": "2025-01-02", "hours": 4 }
]
```

---

## 1.6 TaskActualCell（実績工数）

### ■ GET /tasks/{id}/actual  
### ■ PUT /tasks/{id}/actual  

---

## 1.7 ProgressReport（進捗レポート）

### ■ GET /projects/{id}/progress  
### ■ POST /projects/{id}/progress  

---

## 1.8 Issue（課題）

### ■ GET /projects/{id}/issues  
### ■ POST /projects/{id}/issues  
### ■ PUT /issues/{id}  
### ■ DELETE /issues/{id}

---

## 1.9 Defect（欠陥）

### ■ GET /projects/{id}/defects  
### ■ POST /projects/{id}/defects  
### ■ PUT /defects/{id}  
### ■ DELETE /defects/{id}

---

