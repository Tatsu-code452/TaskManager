use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs;
use std::io::Write;
use std::panic;
use std::path::Path;

use crate::model::{
    defect::Defect, issue::Issue, milestone::Milestone, phase::Phase, project::Project, task::Task,
    task_actual_cell::TaskActualCell, task_plan_cell::TaskPlanCell,
};
const DB_DIR: &str = "../data";
const DB_PATH: &str = "../data/db.json";
const DB_TMP_PATH: &str = "../data/db.json.tmp";
const DB_BACKUP_PATH: &str = "../data/db_backup.json";

const CURRENT_SCHEMA_VERSION: u32 = 2;

#[derive(Serialize, Deserialize, Clone)]
pub struct Database {
    #[serde(skip)]
    pub is_test: bool,

    pub schema_version: u32,

    pub projects: Vec<Project>,
    pub phases: Vec<Phase>,
    pub milestones: Vec<Milestone>,
    pub tasks: Vec<Task>,
    pub task_plan_cells: Vec<TaskPlanCell>,
    pub task_actual_cells: Vec<TaskActualCell>,
    pub issues: Vec<Issue>,
    pub defects: Vec<Defect>,

    #[serde(skip)]
    pub project_index: HashMap<String, usize>,
    #[serde(skip)]
    pub phase_index: HashMap<(String, String), usize>,
    #[serde(skip)]
    pub milestone_index: HashMap<(String, String), usize>,
    #[serde(skip)]
    pub task_index: HashMap<(String, String), usize>,
    #[serde(skip)]
    pub issue_index: HashMap<(String, String), usize>,
    #[serde(skip)]
    pub defect_index: HashMap<(String, String), usize>,
}

impl Default for Database {
    fn default() -> Self {
        Self {
            is_test: false,
            schema_version: CURRENT_SCHEMA_VERSION,
            projects: vec![],
            phases: vec![],
            milestones: vec![],
            tasks: vec![],
            task_plan_cells: vec![],
            task_actual_cells: vec![],
            issues: vec![],
            defects: vec![],
            project_index: HashMap::new(),
            phase_index: HashMap::new(),
            milestone_index: HashMap::new(),
            task_index: HashMap::new(),
            issue_index: HashMap::new(),
            defect_index: HashMap::new(),
        }
    }
}

impl Database {
    pub fn empty() -> Self {
        Self::default()
    }

    // -------------------------
    // Load + Migration
    // -------------------------
    pub fn load() -> Result<Self, String> {
        match fs::read_to_string(DB_PATH) {
            Ok(content) => {
                let result = panic::catch_unwind(|| serde_json::from_str::<Database>(&content));
                let mut db: Database = match result {
                    Ok(Ok(db)) => db,
                    Ok(Err(e)) => {
                        return Err(format!("JSON decode error: {}", e));
                    }
                    Err(_) => {
                        return Err("JSON parse panic: structure mismatch".into());
                    }
                };

                if db.schema_version != CURRENT_SCHEMA_VERSION {
                    db = db.migrate()?;
                }

                // テーブルごとの index を再構築
                db.rebuild_project_index();
                db.rebuild_phase_index();
                db.rebuild_milestone_index();
                db.rebuild_task_index();
                db.rebuild_issue_index();
                db.rebuild_defect_index();

                Ok(db)
            }
            Err(_) => Ok(Self::empty()),
        }
    }

    fn migrate(mut self) -> Result<Self, String> {
        // 将来ここにバージョンごとの変換を書く
        self.schema_version = CURRENT_SCHEMA_VERSION;
        Ok(self)
    }

    // -------------------------
    // Atomic save + backup
    // -------------------------
    pub fn save_atomic(&self) -> Result<(), String> {
        if self.is_test {
            return Ok(());
        }

        // 保存先
        let path = Path::new(DB_PATH);
        let backup_path = Path::new(DB_BACKUP_PATH);
        let tmp_path = Path::new(DB_TMP_PATH);

        // ディレクトリが無ければ作成
        if !Path::new(DB_DIR).exists() {
            fs::create_dir_all(DB_DIR)
                .map_err(|e| format!("Failed to create DB directory: {}", e))?;
        }

        // -------------------------
        // ① 既存ファイルをバックアップ
        // -------------------------
        if path.exists() {
            fs::copy(path, backup_path).map_err(|e| format!("Failed to create backup: {}", e))?;
        }

        // -------------------------
        // ② 一時ファイルに書き込む
        // -------------------------
        let json = serde_json::to_string_pretty(self)
            .map_err(|e| format!("Failed to serialize DB: {}", e))?;

        {
            let mut file = fs::File::create(tmp_path)
                .map_err(|e| format!("Failed to create temp file: {}", e))?;
            file.write_all(json.as_bytes())
                .map_err(|e| format!("Failed to write temp file: {}", e))?;
        }

        // -------------------------
        // ③ 一時ファイルを本番に置き換える（atomic）
        // -------------------------
        fs::rename(tmp_path, path).map_err(|e| format!("Failed to replace DB file: {}", e))?;

        Ok(())
    }
}
