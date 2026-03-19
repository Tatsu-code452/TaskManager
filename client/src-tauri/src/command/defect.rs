use crate::command::state::AppState;
use crate::db::database::Database;
use crate::model::defect::{Defect, DefectRequest};
use crate::service::defect_service::DefectService;
use crate::{define_command_multiple_id, define_tauri_commands_multiple_id};

define_command_multiple_id!(
    DefectCommand,
    DefectService,
    DefectRequest,
    Defect,
    list,
    create,
    update,
    delete
);

define_tauri_commands_multiple_id!(
    DefectCommand,
    DefectRequest,
    Defect,
    list_defects,
    create_defect,
    update_defect,
    delete_defect
);
