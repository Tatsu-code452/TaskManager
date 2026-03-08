use crate::db::database::Database;
use crate::model::defect::{Defect, DefectSeverity, DefectStatus};
use crate::model::time_stamps::Timestamps;

pub struct DefectService;

impl DefectService {
    pub fn create(
        db: &mut Database,
        id: String,
        project_id: String,
        task_id: Option<String>,
        title: String,
        description: String,
        severity: DefectSeverity,
        status: DefectStatus,
    ) -> Result<Defect, String> {
        let defect = Defect {
            id,
            project_id,
            task_id,
            title,
            description,
            severity,
            status,
            timestamps: Timestamps::new(),
        };

        db.add_defect(defect.clone());
        db.save_atomic()?;

        Ok(defect)
    }

    pub fn update(
        db: &mut Database,
        id: String,
        title: Option<String>,
        description: Option<String>,
        severity: Option<DefectSeverity>,
        status: Option<DefectStatus>,
    ) -> Result<Defect, String> {
        {
            let defect = db.find_defect_mut(&id).ok_or("Defect not found")?;

            if let Some(v) = title {
                defect.title = v;
            }
            if let Some(v) = description {
                defect.description = v;
            }
            if let Some(v) = severity {
                defect.severity = v;
            }
            if let Some(v) = status {
                defect.status = v;
            }

            defect.timestamps.touch();
        }

        db.save_atomic()?;
        Ok(db.find_defect(&id).unwrap().clone())
    }

    pub fn delete(db: &mut Database, id: String) -> Result<(), String> {
        db.delete_defect(&id);
        db.save_atomic()?;
        Ok(())
    }
}
