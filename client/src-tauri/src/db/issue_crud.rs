use crate::db::database::Database;
use crate::model::{
    issue::{Issue, IssuePriority, IssueStatus},
    time_stamps::Timestamps,
};
use crate::{define_crud_multiple_id, define_next_id};

impl Database {
    define_crud_multiple_id!(
        add_issue,
        update_issue,
        delete_issue,
        find_issue,
        find_issue_mut,
        rebuild_issue_index,
        issues,
        issue_index,
        row,
        Issue,
        project_id,
        id
    );

    define_next_id!(next_issue_id, issues, project_id, id, "ISSUE-");

    pub fn find_issue_by_project(&self, project_id: &str) -> Vec<Issue> {
        self.issues
            .iter()
            .filter(|m| m.project_id == project_id)
            .cloned()
            .collect()
    }
}
