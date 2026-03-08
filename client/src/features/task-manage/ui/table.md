CREATE TABLE tasks (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phase            VARCHAR(100) NOT NULL,
  name             VARCHAR(200) NOT NULL,

  -- 実績進捗率（手入力）
  actual_progress  NUMERIC(5,2) NOT NULL DEFAULT 0,

  created_at       TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE task_plan_cells (
  task_id   UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  date      DATE NOT NULL,
  hours     NUMERIC(5,2) NOT NULL,

  PRIMARY KEY (task_id, date)
);

CREATE TABLE task_actual_cells (
  task_id   UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  date      DATE NOT NULL,
  hours     NUMERIC(5,2) NOT NULL,

  PRIMARY KEY (task_id, date)
);

[
  {
    "id": 1,
    "phase": "要件定義",
    "name": "画面イメージ作成",
    "actual_progress": 25,
    "planCells": [
      { "date": "2026-02-01", "hours": 1 },
      { "date": "2026-02-02", "hours": 1 },
      { "date": "2026-02-03", "hours": 2 },
      { "date": "2026-02-11", "hours": 4 }
    ],
    "actualCells": [
      { "date": "2026-02-02", "hours": 6 },
      { "date": "2026-02-04", "hours": 4 }
    ]
  }
]

{
  "date": "2026-02-03",
  "rowType": "plan",
  "value": 2
}

INSERT INTO task_plan_cells (task_id, date, hours)
VALUES ($1, $2, $3)
ON CONFLICT (task_id, date)
DO UPDATE SET hours = EXCLUDED.hours;

{
  "phase": "要件定義",
  "name": "画面イメージ作成",
  "actual_progress": 50
}