use crate::define_tauri_commands_multiple_id;
use crate::{
    command::state::AppState,
    model::defect::{Defect, DefectRequest},
    service::defect_service::DefectService,
};
use tauri::State;

define_tauri_commands_multiple_id!(
    DefectService,
    Defect,
    DefectRequest,
    list_defects,
    create_defect,
    update_defect,
    delete_defect
);
