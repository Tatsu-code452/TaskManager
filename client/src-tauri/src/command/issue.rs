use crate::command::state::AppState;
use crate::db::database::Database;
use crate::model::issue::{Issue, IssueRequest};
use crate::service::issue_service::IssueService;
use crate::{define_command_multiple_id, define_tauri_commands_multiple_id};

define_command_multiple_id!(
    IssueCommand,
    IssueService,
    IssueRequest,
    Issue,
    list,
    create,
    update,
    delete
);

define_tauri_commands_multiple_id!(
    IssueCommand,
    IssueRequest,
    Issue,
    list_issues,
    create_issue,
    update_issue,
    delete_issue
);
