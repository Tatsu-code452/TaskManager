use crate::define_tauri_commands_multiple_id;
use crate::{
    command::state::AppState,
    model::issue::{Issue, IssueRequest},
    service::issue_service::IssueService,
};
use tauri::State;

define_tauri_commands_multiple_id!(
    IssueService,
    Issue,
    IssueRequest,
    list_issues,
    create_issue,
    update_issue,
    delete_issue
);
