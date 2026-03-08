use crate::db::database::Database;
use crate::db::delete_basic::delete_basic;
use crate::define_crud;
use crate::model::project::Project;

define_crud!(
    add_project,
    find_project,
    find_project_mut,
    _delete_project,
    projects,
    project_index,
    Project
);

impl Database {
    pub fn delete_project(&mut self, id: &str) {
        if delete_basic(&mut self.projects, &mut self.project_index, id) {
            self.rebuild_indexes();
        }
        self.tasks.retain(|t| t.project_id != id);
        self.rebuild_indexes();
    }
}
