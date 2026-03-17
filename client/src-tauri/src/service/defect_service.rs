use crate::db::database::Database;
use crate::model::defect::{Defect, DefectRequest};

pub struct DefectService;

impl DefectService {
    pub fn list(db: &mut Database, project_id: String) -> Result<Vec<Defect>, String> {
        Ok(db.find_defect_by_project(&project_id))
    }

    pub fn create(db: &mut Database, payload: DefectRequest) -> Result<Defect, String> {
        if db
            .find_defect_by_id_and_project(&payload.id, &payload.project_id)
            .is_some()
        {
            return Err("Defect already exists".into());
        }

        let mut defect = Defect::new(payload.id, payload.project_id);

        payload.task_id.map(|v| defect.task_id = Some(v));
        payload.title.map(|v| defect.title = v);
        payload.description.map(|v| defect.description = v);
        payload.severity.map(|v| defect.severity = v);
        payload.status.map(|v| defect.status = v);

        db.add_defect(defect.clone());
        db.save_atomic()?;

        Ok(defect)
    }

    pub fn update(db: &mut Database, payload: DefectRequest) -> Result<Defect, String> {
        {
            let defect = db
                .find_defect_mut_by_id_and_project(&payload.id, &payload.project_id)
                .ok_or_else(|| "Defect not found".to_string())?;

            payload.task_id.map(|v| defect.task_id = Some(v));
            payload.title.map(|v| defect.title = v);
            payload.description.map(|v| defect.description = v);
            payload.severity.map(|v| defect.severity = v);
            payload.status.map(|v| defect.status = v);

            defect.timestamps.touch();
        }

        db.save_atomic()?;

        Ok(db
            .find_defect_mut_by_id_and_project(&payload.id, &payload.project_id)
            .unwrap()
            .clone())
    }

    pub fn delete(db: &mut Database, id: String, project_id: String) -> Result<(), String> {
        db.delete_defect_by_id_and_project(&id, &project_id)
            .ok_or_else(|| "Defect not found".to_string())?;

        db.save_atomic()?;
        Ok(())
    }
}
