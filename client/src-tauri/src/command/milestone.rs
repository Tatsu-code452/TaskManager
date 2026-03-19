use crate::command::state::AppState;
use crate::db::database::Database;
use crate::{define_command_multiple_id, define_tauri_commands_multiple_id};
use crate::model::milestone::{Milestone, MilestoneRequest};
use crate::service::milestone_service::MilestoneService;

define_command_multiple_id!(
    MilestoneCommand,
    MilestoneService,
    MilestoneRequest,
    Milestone,
    list,
    create,
    update,
    delete
);

define_tauri_commands_multiple_id!(
    MilestoneCommand,
    MilestoneRequest,
    Milestone,
    list_milestones,
    create_milestone,
    update_milestone,
    delete_milestone
);
