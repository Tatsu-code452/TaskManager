use crate::db::database::Database;
use crate::define_service_multiple_id;
use crate::model::phase::{Phase, PhaseRequest};

define_service_multiple_id!(
    PhaseService,
    Phase,
    PhaseRequest,
    list,
    create,
    update,
    delete,
    find_phase_by_project,
    find_phase,
    find_phase_mut,
    add_phase,
    delete_phase,
    next_phase_id,
    project_id,
    id
);
