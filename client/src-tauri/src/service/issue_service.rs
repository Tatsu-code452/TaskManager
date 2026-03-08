use crate::db::database::Database;
use crate::model::issue::{Issue, IssuePriority, IssueStatus};
use crate::model::time_stamps::Timestamps;

pub struct IssueService;

impl IssueService {
    pub fn create(
        db: &mut Database,
        id: String,
        project_id: String,
        task_id: Option<String>,
        title: String,
        description: String,
        status: IssueStatus,
        priority: IssuePriority,
        owner: String,
    ) -> Result<Issue, String> {
        let issue = Issue {
            id,
            project_id,
            task_id,
            title,
            description,
            status,
            priority,
            owner,
            timestamps: Timestamps::new(),
        };

        db.add_issue(issue.clone());
        db.save_atomic()?;

        Ok(issue)
    }

    pub fn update(
        db: &mut Database,
        id: String,
        title: Option<String>,
        description: Option<String>,
        status: Option<IssueStatus>,
        priority: Option<IssuePriority>,
        owner: Option<String>,
    ) -> Result<Issue, String> {
        {
            let issue = db.find_issue_mut(&id).ok_or("Issue not found")?;

            if let Some(v) = title {
                issue.title = v;
            }
            if let Some(v) = description {
                issue.description = v;
            }
            if let Some(v) = status {
                issue.status = v;
            }
            if let Some(v) = priority {
                issue.priority = v;
            }
            if let Some(v) = owner {
                issue.owner = v;
            }

            issue.timestamps.touch();
        }

        db.save_atomic()?;
        Ok(db.find_issue(&id).unwrap().clone())
    }

    pub fn delete(db: &mut Database, id: String) -> Result<(), String> {
        db.delete_issue(&id);
        db.save_atomic()?;
        Ok(())
    }
}
