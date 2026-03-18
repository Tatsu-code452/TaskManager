use crate::db::database::Database;
use crate::define_crud_multiple_id;
use crate::model::milestone::Milestone;

impl Database {
    define_crud_multiple_id!(
        add_milestone,
        update_milestone,
        delete_milestone,
        find_milestone,
        find_milestone_mut,
        find_milestone_by_project,
        next_milestone_id,
        rebuild_milestone_index,
        milestones,
        milestone_index,
        row,
        Milestone,
        project_id,
        id,
        "MILESTONE-"
    );
}
