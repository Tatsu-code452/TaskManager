use crate::db::database::Database;
use crate::db::delete_basic::delete_basic;
use crate::define_crud;
use crate::model::phase::Phase;

define_crud!(
    add_phase,
    find_phase,
    find_phase_mut,
    _delete_phase,
    phases,
    phase_index,
    Phase
);

impl Database {
    pub fn delete_phase(&mut self, id: &str) {
        if delete_basic(&mut self.phases, &mut self.phase_index, id) {
            self.rebuild_indexes();
        }
        self.tasks.retain(|t| t.phase_id != id);
        self.rebuild_indexes();
    }

    pub fn read_all_phases_by_project(&self, project_id: &str) -> Vec<Phase> {
        self.phases
            .iter()
            .filter(|p| p.project_id == project_id)
            .cloned()
            .collect()
    }
}
