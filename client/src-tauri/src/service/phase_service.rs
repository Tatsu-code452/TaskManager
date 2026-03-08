use crate::db::database::Database;
use crate::model::phase::Phase;
use crate::model::time_stamps::Timestamps;

pub struct PhaseService;

impl PhaseService {
    pub fn create(
        db: &mut Database,
        id: String,
        project_id: String,
        name: String,
        order: u32,
        inputs: Vec<String>,
        outputs: Vec<String>,
    ) -> Result<Phase, String> {
        let phase = Phase {
            id,
            project_id,
            name,
            order,
            inputs,
            outputs,
            timestamps: Timestamps::new(),
        };

        db.add_phase(phase.clone());
        db.save_atomic()?;

        Ok(phase)
    }

    pub fn update(
        db: &mut Database,
        id: String,
        project_id: Option<String>,
        name: Option<String>,
        order: Option<u32>,
        inputs: Option<Vec<String>>,
        outputs: Option<Vec<String>>,
    ) -> Result<Phase, String> {
        {
            let phase = db.find_phase_mut(&id).ok_or("Phase not found")?;

            if let Some(v) = project_id {
                phase.project_id = v;
            }
            if let Some(v) = name {
                phase.name = v;
            }
            if let Some(v) = order {
                phase.order = v;
            }
            if let Some(v) = inputs {
                phase.inputs = v;
            }
            if let Some(v) = outputs {
                phase.outputs = v;
            }

            phase.timestamps.touch();
        }

        db.save_atomic()?;
        Ok(db.find_phase(&id).unwrap().clone())
    }

    pub fn delete(db: &mut Database, id: String) -> Result<(), String> {
        db.delete_phase(&id);
        db.save_atomic()?;
        Ok(())
    }
}
