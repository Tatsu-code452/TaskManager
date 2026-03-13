use crate::db::database::Database;
use crate::model::milestone::{Milestone, MilestoneRequest, MilestoneStatus};

pub struct MilestoneService;

impl MilestoneService {
    pub fn list(db: &mut Database, project_id: String) -> Result<Vec<Milestone>, String> {
        let result = db.find_milestone_by_project(&project_id);
        Ok(result)
    }

    pub fn create(db: &mut Database, payload: MilestoneRequest) -> Result<Milestone, String> {
        if db
            .find_milestone_by_id_and_project(&payload.id, &payload.project_id)
            .is_some()
        {
            return Err("Milestone already exists".into());
        }

        // 新規作成
        let mut ms = Milestone::new(payload.id, payload.project_id);

        payload.name.map(|v| ms.name = v);
        payload
            .planned_start_date
            .map(|v| ms.planned_start_date = v);
        payload.planned_end_date.map(|v| ms.planned_end_date = v);
        payload.actual_start_date.map(|v| ms.actual_start_date = v);
        payload.actual_end_date.map(|v| ms.actual_end_date = v);
        ms.status = payload.status.unwrap_or(MilestoneStatus::NotStarted);

        db.add_milestone(ms.clone());
        db.save_atomic()?;

        Ok(ms)
    }

    pub fn update(db: &mut Database, payload: MilestoneRequest) -> Result<Milestone, String> {
        {
            let ms = db
                .find_milestone_mut_by_id_and_project(&payload.id, &payload.project_id)
                .ok_or_else(|| "Milestone not found".to_string())?;

            payload.name.map(|v| ms.name = v);
            payload
                .planned_start_date
                .map(|v| ms.planned_start_date = v);
            payload.planned_end_date.map(|v| ms.planned_end_date = v);
            payload.actual_start_date.map(|v| ms.actual_start_date = v);
            payload.actual_end_date.map(|v| ms.actual_end_date = v);
            payload.status.map(|v| ms.status = v);

            ms.timestamps.touch();
        }

        db.save_atomic()?;

        Ok(db
            .find_milestone_mut_by_id_and_project(&payload.id, &payload.project_id)
            .unwrap()
            .clone())
    }

    pub fn delete(db: &mut Database, id: String, project_id: String) -> Result<(), String> {
        // id + project_id の組み合わせで検索
        db.delete_milestone_by_id_and_project(&id, &project_id)
            .ok_or_else(|| "Milestone not found".to_string())?;

        db.save_atomic()?;
        Ok(())
    }
}
