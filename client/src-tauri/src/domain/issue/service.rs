use crate::{
    db::database::Database,
    domain::issue::model::{Issue, IssueRequest},
};

pub struct IssueService;

impl IssueService {
    pub fn list(db: &Database, project_id: &str) -> Result<Vec<Issue>, String> {
        if project_id.trim().is_empty() {
            return Err("Key is empty".into());
        }

        db.find_issue_by_project(&project_id)
            .ok_or_else(|| "Not found".to_string())
    }

    pub fn create(db: &mut Database, payload: &IssueRequest) -> Result<Issue, String> {
        if payload.project_id.trim().is_empty() {
            return Err("Key is empty".into());
        }

        // new(id, project_id)
        let mut item = Issue::default();
        item.id = db.next_issue_id(&payload.project_id);
        item.apply_request(&payload);

        db.add_issue(&item)
            .ok_or_else(|| "Failed to add".to_string())?;

        db.save_atomic()?;
        Ok(item)
    }

    pub fn update(db: &mut Database, payload: &IssueRequest) -> Result<Issue, String> {
        let keys = [payload.project_id.clone(), payload.id.clone()];
        if keys.iter().any(|v| v.trim().is_empty()) {
            return Err("Key is empty".into());
        }

        {
            let item = db
                .find_issue_mut(&payload.project_id, &payload.id)
                .ok_or_else(|| "Not found".to_string())?;

            item.apply_request(&payload);
            item.timestamps.touch();
        }

        db.save_atomic()?;

        Ok(db
            .find_issue(&payload.project_id, &payload.id)
            .unwrap()
            .clone())
    }

    pub fn delete(db: &mut Database, project_id: &str, id: &str) -> Result<(), String> {
        let keys = [project_id, id];

        if keys.iter().any(|v| v.trim().is_empty()) {
            return Err("Key is empty".into());
        }

        db.delete_issue(project_id, id)
            .ok_or_else(|| "Not found".to_string())?;

        db.save_atomic()?;
        Ok(())
    }
}
