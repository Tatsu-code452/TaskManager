use crate::db::database::Database;
use crate::define_crud;
use crate::model::milestone::Milestone;

define_crud!(
    add_milestone,
    find_milestone,
    find_milestone_mut,
    delete_milestone,
    milestones,
    milestone_index,
    Milestone
);
