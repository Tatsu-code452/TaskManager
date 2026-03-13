use crate::db::database::Database;
use crate::model::phase::{Phase, PhaseRequest};

pub struct PhaseService;

impl PhaseService {
    pub fn list(db: &mut Database, project_id: String) -> Result<Vec<Phase>, String> {
        let result = db.find_phase_by_project(&project_id);
        Ok(result)
    }

    pub fn create(db: &mut Database, payload: PhaseRequest) -> Result<Phase, String> {
        // 複合キーで重複チェック
        if db
            .find_phase_by_id_and_project(&payload.id, &payload.project_id)
            .is_some()
        {
            return Err("Phase already exists".into());
        }

        // 新規作成
        let mut phase = Phase::new(payload.id, payload.project_id);

        payload.name.map(|v| phase.name = v);
        payload.order.map(|v| phase.order = v);
        payload.inputs.map(|v| phase.inputs = v);
        payload.outputs.map(|v| phase.outputs = v);

        db.add_phase(phase.clone());
        db.save_atomic()?;

        Ok(phase)
    }

    pub fn update(db: &mut Database, payload: PhaseRequest) -> Result<Phase, String> {
        {
            let phase = db
                .find_phase_mut_by_id_and_project(&payload.id, &payload.project_id)
                .ok_or_else(|| "Phase not found".to_string())?;

            payload.name.map(|v| phase.name = v);
            payload.order.map(|v| phase.order = v);
            payload.inputs.map(|v| phase.inputs = v);
            payload.outputs.map(|v| phase.outputs = v);

            phase.timestamps.touch();
        }

        db.save_atomic()?;

        Ok(db
            .find_phase_by_id_and_project(&payload.id, &payload.project_id)
            .unwrap()
            .clone())
    }

    pub fn delete(db: &mut Database, id: String, project_id: String) -> Result<(), String> {
        db.delete_phase_by_id_and_project(&id, &project_id)
            .ok_or_else(|| "Phase not found".to_string())?;

        db.save_atomic()?;
        Ok(())
    }
}
