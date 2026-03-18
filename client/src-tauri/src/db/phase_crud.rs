use crate::db::database::Database;
use crate::define_crud_multiple_id;
use crate::model::phase::Phase;

impl Database {
    define_crud_multiple_id!(
        add_phase,
        update_phase,
        delete_phase,
        find_phase,
        find_phase_mut,
        find_phase_by_project,
        next_phase_id,
        rebuild_phase_index,
        phases,
        phase_index,
        row,
        Phase,
        project_id,
        id,
        "PHASE-"
    );
}
