use crate::db::database::Database;
use crate::model::project::{Project, ProjectRequest, ProjectStatus};

pub struct ProjectService;

impl ProjectService {
    pub fn create(db: &mut Database, payload: ProjectRequest) -> Result<Project, String> {
        if db.find_project(&payload.id).is_some() {
            return Err("Project already exists".into());
        }

        // 新規作成
        let mut project = Project::new(payload.id);

        payload.name.map(|v| project.name = v);
        payload.client.map(|v| project.client = v);
        project.status = payload.status.unwrap_or(ProjectStatus::Planned);
        payload.start_date.map(|v| project.start_date = v);
        payload.end_date.map(|v| project.end_date = v);

        db.add_project(project.clone());
        db.save_atomic()?;

        Ok(project)
    }

    pub fn update(db: &mut Database, payload: ProjectRequest) -> Result<Project, String> {
        {
            let project = db
                .find_project_mut(&payload.id)
                .ok_or_else(|| "Project not found".to_string())?;

            payload.name.map(|v| project.name = v);
            payload.client.map(|v| project.client = v);
            project.status = payload.status.unwrap_or(ProjectStatus::Planned);
            payload.start_date.map(|v| project.start_date = v);
            payload.end_date.map(|v| project.end_date = v);

            project.timestamps.touch();
        }

        db.save_atomic()?;
        Ok(db.find_project(&payload.id).unwrap().clone())
    }

    pub fn delete(db: &mut Database, id: String) -> Result<(), String> {
        db.delete_project(&id);
        db.save_atomic()?;
        Ok(())
    }
}
