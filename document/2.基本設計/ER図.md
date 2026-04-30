┌──────────────────────────┐
│         Project          │
│  id (PK)                 │
│  name                    │
│  client                  │
│  status                  │
│  start_date              │
│  end_date                │
└───────────────┬──────────┘
                │ 1
                │
                │ N
┌───────────────▼──────────┐
│        Milestone          │
│  id (PK)                  │
│  project_id (FK)──────────┘
│  name                     │
│  planned_date             │
│  actual_date              │
└───────────────────────────┘


┌──────────────────────────┐
│          Phase           │
│  id (PK)                 │
│  project_id (FK)─────────┐
│  name                    ││
│  order                   ││
└───────────────┬──────────┘│
                │ 1          │
                │            │
                │ N          │
┌───────────────▼──────────┐│
│           Task            ││
│  id (PK)                  ││
│  project_id (FK)──────────┘│
│  phase_id (FK)─────────────┘
│  name                     │
│  planned_start            │
│  planned_end              │
│  actual_start             │
│  actual_end               │
│  planned_hours            │
│  actual_hours             │
│  progress_rate            │
└───────────────┬──────────┘
                │ 1
                │
                │ N
     ┌──────────▼───────────┐
     │    TaskPlanCell      │
     │  task_id (FK)        │
     │  date                │
     │  hours               │
     └──────────────────────┘

     ┌──────────▼───────────┐
     │   TaskActualCell     │
     │  task_id (FK)        │
     │  date                │
     │  hours               │
     └──────────────────────┘


┌──────────────────────────┐
│     ProgressReport       │
│  id (PK)                 │
│  project_id (FK)─────────┐
│  task_id (FK)────────────┘
│  report_date             │
│  progress_rate           │
│  comment                 │
└──────────────────────────┘


┌──────────────────────────┐
│          Issue           │
│  id (PK)                 │
│  project_id (FK)─────────┐
│  task_id (FK, nullable)──┘
│  title                   │
│  description             │
│  status                  │
│  priority                │
│  owner                   │
└──────────────────────────┘


┌──────────────────────────┐
│         Defect           │
│  id (PK)                 │
│  project_id (FK)─────────┐
│  task_id (FK, nullable)──┘
│  title                   │
│  description             │
│  severity                │
│  status                  │
└──────────────────────────┘