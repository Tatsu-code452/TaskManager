### users（ユーザテーブル）

```sql
CREATE TABLE users (
    id serial PRIMARY KEY,
    password varchar(100) NOT NULL,
    name varchar(256) NOT NULL,
    role char(1) NOT NULL,
    created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

---

### tasks（タスクテーブル）

```sql
CREATE TABLE tasks (
    id serial PRIMARY KEY,
    name varchar(256) NOT NULL,
    project_id integer NOT NULL REFERENCES projects(id),
    phase_id integer NOT NULL REFERENCES phases(id),
    category_id integer NOT NULL REFERENCES categories(id),
    user_id integer NOT NULL REFERENCES users(id),
    planned_start_date date NOT NULL,
    planned_end_date date NOT NULL,
    planned_effort numeric(5,2) NOT NULL,
    actual_start_date date,
    actual_end_date date,
    actual_effort numeric(5,2),
    status_id integer NOT NULL REFERENCES statuses(id),
    progress_rate numeric(3,1) NOT NULL DEFAULT 0.0,
    priority integer NOT NULL,
    pre_task_id integer,
    next_task_id integer,
    created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

---

### projects（案件マスタ）

```sql
CREATE TABLE projects (
    id serial PRIMARY KEY,
    name varchar(256) NOT NULL,
    start_date date,
    end_date date,
    created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

---

### phases（フェーズマスタ）

```sql
CREATE TABLE phases (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL,
    sort_no integer,
    created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

---

### categories（カテゴリマスタ）

```sql
CREATE TABLE categories (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL,
    created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

---

### statuses（ステータスマスタ）

```sql
CREATE TABLE statuses (
    id serial PRIMARY KEY,
    name varchar(50) NOT NULL,
    color varchar(7),
    created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

