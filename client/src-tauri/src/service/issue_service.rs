use crate::db::database::Database;
use crate::model::issue::{Issue, IssueRequest};

pub struct IssueService;

impl IssueService {
    pub fn list(db: &mut Database, project_id: String) -> Result<Vec<Issue>, String> {
        Ok(db.find_issue_by_project(&project_id))
    }

    pub fn create(db: &mut Database, payload: IssueRequest) -> Result<Issue, String> {
        if db
            .find_issue_by_id_and_project(&payload.id, &payload.project_id)
            .is_some()
        {
            return Err("Issue already exists".into());
        }

        let mut issue = Issue::new(payload.id, payload.project_id);

        payload.task_id.map(|v| issue.task_id = Some(v));
        payload.title.map(|v| issue.title = v);
        payload.description.map(|v| issue.description = v);
        payload.status.map(|v| issue.status = v);
        payload.priority.map(|v| issue.priority = v);
        payload.owner.map(|v| issue.owner = v);

        db.add_issue(issue.clone());
        db.save_atomic()?;

        Ok(issue)
    }

    pub fn update(db: &mut Database, payload: IssueRequest) -> Result<Issue, String> {
        {
            let issue = db
                .find_issue_mut_by_id_and_project(&payload.id, &payload.project_id)
                .ok_or_else(|| "Issue not found".to_string())?;

            payload.task_id.map(|v| issue.task_id = Some(v));
            payload.title.map(|v| issue.title = v);
            payload.description.map(|v| issue.description = v);
            payload.status.map(|v| issue.status = v);
            payload.priority.map(|v| issue.priority = v);
            payload.owner.map(|v| issue.owner = v);

            issue.timestamps.touch();
        }

        db.save_atomic()?;

        Ok(db
            .find_issue_mut_by_id_and_project(&payload.id, &payload.project_id)
            .unwrap()
            .clone())
    }

    pub fn delete(db: &mut Database, id: String, project_id: String) -> Result<(), String> {
        db.delete_issue_by_id_and_project(&id, &project_id)
            .ok_or_else(|| "Issue not found".to_string())?;

        db.save_atomic()?;
        Ok(())
    }
}
