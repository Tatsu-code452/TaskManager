use crate::db::database::Database;
use crate::define_service_multiple_id;
use crate::model::issue::{Issue, IssueRequest};

define_service_multiple_id!(
    IssueService,
    Issue,
    IssueRequest,
    list,
    create,
    update,
    delete,
    find_issue_by_project,
    find_issue,
    find_issue_mut,
    add_issue,
    delete_issue,
    next_issue_id,
    project_id,
    id
);
