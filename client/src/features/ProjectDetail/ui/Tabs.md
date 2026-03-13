<Tabs>
  <Tab label="概要" />
  <Tab label="マイルストーン" />
  <Tab label="フェーズ & WBS" />
  <Tab label="課題" />
  <Tab label="欠陥" />
</Tabs>

src/features/ProjectDetail
  ├── domain
  │     └── projectDetailApi.ts
  ├── hooks
  │     ├── controller
  │     │     └── useProjectDetailController.ts
  │     └── state
  │           └── useProjectDetailStates.ts
  ├── ui
  │     ├── OverviewTab.tsx   ← 今作るのはこれ
  │     ├── MilestoneTab.tsx
  │     ├── WbsTab.tsx
  │     ├── IssueTab.tsx
  │     └── DefectTab.tsx
  ├── index.tsx
  └── index.module.css