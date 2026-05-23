use crate::{
    db::database::Database,
    domain::phase::model::{Phase, PhaseRequest},
};

pub struct PhaseService;

impl PhaseService {
    pub fn list(db: &Database, project_id: &str) -> Result<Vec<Phase>, String> {
        if project_id.trim().is_empty() {
            return Err("Key is empty".into());
        }

        db.find_phase_by_project(&project_id)
            .ok_or_else(|| "Not found".to_string())
    }

    pub fn create(db: &mut Database, payload: &PhaseRequest) -> Result<Phase, String> {
        if payload.project_id.trim().is_empty() {
            return Err("Key is empty".into());
        }

        // new(id, project_id)
        let mut item = Phase::default();
        item.id = db.next_phase_id(&payload.project_id);
        item.apply_request(&payload);

        db.add_phase(&item)
            .ok_or_else(|| "Failed to add".to_string())?;

        db.save_atomic()?;
        Ok(item)
    }

    pub fn update(db: &mut Database, payload: &PhaseRequest) -> Result<Phase, String> {
        let keys = [payload.project_id.clone(), payload.id.clone()];
        if keys.iter().any(|v| v.trim().is_empty()) {
            return Err("Key is empty".into());
        }

        {
            let item = db
                .find_phase_mut(&payload.project_id, &payload.id)
                .ok_or_else(|| "Not found".to_string())?;

            item.apply_request(&payload);
            item.timestamps.touch();
        }

        db.save_atomic()?;

        Ok(db
            .find_phase(&payload.project_id, &payload.id)
            .unwrap()
            .clone())
    }

    pub fn delete(db: &mut Database, project_id: &str, id: &str) -> Result<(), String> {
        let keys = [project_id, id];

        if keys.iter().any(|v| v.trim().is_empty()) {
            return Err("Key is empty".into());
        }

        db.delete_phase(project_id, id)
            .ok_or_else(|| "Not found".to_string())?;

        db.save_atomic()?;
        Ok(())
    }
}
