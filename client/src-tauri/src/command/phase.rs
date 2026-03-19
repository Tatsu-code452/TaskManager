use crate::command::state::AppState;
use crate::db::database::Database;
use crate::{define_command_multiple_id, define_tauri_commands_multiple_id};
use crate::model::phase::{Phase, PhaseRequest};
use crate::service::phase_service::PhaseService;

define_command_multiple_id!(
    PhaseCommand,
    PhaseService,
    PhaseRequest,
    Phase,
    list,
    create,
    update,
    delete
);

define_tauri_commands_multiple_id!(
    PhaseCommand,
    PhaseRequest,
    Phase,
    list_phases,
    create_phase,
    update_phase,
    delete_phase
);
