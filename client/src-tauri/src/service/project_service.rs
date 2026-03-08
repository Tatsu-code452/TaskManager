use crate::db::database::Database;
use crate::model::project::{Project, ProjectStatus};
use crate::model::time_stamps::Timestamps;

pub struct ProjectService;

impl ProjectService {
    pub fn create(
        db: &mut Database,
        id: String,
        name: String,
        client: String,
        status: ProjectStatus,
        start_date: String,
        end_date: String,
    ) -> Result<Project, String> {
        let project = Project {
            id,
            name,
            client,
            status,
            start_date,
            end_date,
            timestamps: Timestamps::new(),
        };

        db.add_project(project.clone());
        db.save_atomic()?;

        Ok(project)
    }
    pub fn update(
        db: &mut Database,
        id: String,
        name: Option<String>,
        client: Option<String>,
        status: Option<ProjectStatus>,
        start_date: Option<String>,
        end_date: Option<String>,
    ) -> Result<Project, String> {
        {
            let project = db.find_project_mut(&id).ok_or("Project not found")?;

            if let Some(v) = name {
                project.name = v;
            }
            if let Some(v) = client {
                project.client = v;
            }
            if let Some(v) = status {
                project.status = v;
            }
            if let Some(v) = start_date {
                project.start_date = v;
            }
            if let Some(v) = end_date {
                project.end_date = v;
            }

            project.timestamps.touch();
        }

        db.save_atomic()?;
        Ok(db.find_project(&id).unwrap().clone())
    }

    pub fn delete(db: &mut Database, id: String) -> Result<(), String> {
        db.delete_project(&id);
        db.save_atomic()?;
        Ok(())
    }
}
