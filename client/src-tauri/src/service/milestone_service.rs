use crate::db::database::Database;
use crate::define_service_multiple_id;
use crate::model::milestone::{Milestone, MilestoneRequest};

define_service_multiple_id!(
    MilestoneService,
    Milestone,
    MilestoneRequest,
    list,
    create,
    update,
    delete,
    find_milestone_by_project,
    find_milestone,
    find_milestone_mut,
    add_milestone,
    delete_milestone,
    next_milestone_id,
    project_id,
    id
);
