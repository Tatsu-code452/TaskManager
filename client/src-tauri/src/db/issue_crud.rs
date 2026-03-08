use crate::db::database::Database;
use crate::define_crud;
use crate::model::issue::Issue;

define_crud!(
    add_issue,
    find_issue,
    find_issue_mut,
    delete_issue,
    issues,
    issue_index,
    Issue
);
