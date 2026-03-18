use crate::db::database::Database;
use crate::define_crud_multiple_id;
use crate::model::issue::Issue;

impl Database {
    define_crud_multiple_id!(
        add_issue,
        update_issue,
        delete_issue,
        find_issue,
        find_issue_mut,
        find_issue_by_project,
        next_issue_id,
        rebuild_issue_index,
        issues,
        issue_index,
        row,
        Issue,
        project_id,
        id,
        "ISSUE-"
    );
}
