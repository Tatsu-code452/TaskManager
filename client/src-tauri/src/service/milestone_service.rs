use crate::db::database::Database;
use crate::model::milestone::{Milestone, MilestoneStatus};

pub struct MilestoneService;

impl MilestoneService {
    pub fn create(
        db: &mut Database,
        id: String,
        project_id: String,
        name: String,
        planned_start_date: String,
        planned_end_date: String,
    ) -> Result<Milestone, String> {
        let mut ms = Milestone::new(id, project_id);

        ms.name = name;
        ms.planned_start_date = planned_start_date;
        ms.planned_end_date = planned_end_date;

        // 初期状態は NotStarted
        ms.status = MilestoneStatus::NotStarted;

        db.add_milestone(ms.clone());
        db.save_atomic()?;

        Ok(ms)
    }

    pub fn update(
        db: &mut Database,
        id: String,
        name: Option<String>,
        planned_start_date: Option<String>,
        planned_end_date: Option<String>,
        actual_start_date: Option<String>,
        actual_end_date: Option<String>,
        status: Option<MilestoneStatus>,
    ) -> Result<Milestone, String> {
        {
            let ms = db
                .find_milestone_mut(&id)
                .ok_or_else(|| "Milestone not found".to_string())?;

            if let Some(v) = name {
                ms.name = v;
            }
            if let Some(v) = planned_start_date {
                ms.planned_start_date = v;
            }
            if let Some(v) = planned_end_date {
                ms.planned_end_date = v;
            }
            if let Some(v) = actual_start_date {
                ms.actual_start_date = Some(v);
            }
            if let Some(v) = actual_end_date {
                ms.actual_end_date = Some(v);
            }
            if let Some(v) = status {
                ms.status = v;
            }
            // 更新時は touch()
            ms.timestamps.touch();
        }
        db.save_atomic()?;

        Ok(db.find_milestone(&id).unwrap().clone())
    }

    pub fn delete(db: &mut Database, id: String) -> Result<(), String> {
        db.delete_milestone(&id);
        db.save_atomic()?;
        Ok(())
    }
}
