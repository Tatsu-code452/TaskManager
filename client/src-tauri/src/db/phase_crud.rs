use crate::db::database::Database;
use crate::define_crud;
use crate::model::phase::Phase;

define_crud!(
    add_phase,
    find_phase,
    _find_phase_mut,
    _delete_phase,
    phases,
    phase_index,
    Phase
);

impl Database {
    pub fn find_phase_by_project(&mut self, project_id: &str) -> Vec<Phase> {
        self.phases
            .iter()
            .filter(|p| p.project_id == project_id)
            .cloned()
            .collect()
    }

    pub fn find_phase_by_id_and_project(&mut self, id: &str, project_id: &str) -> Option<Phase> {
        self.phases
            .iter()
            .find(|p| p.id == id && p.project_id == project_id)
            .cloned()
    }

    pub fn find_phase_mut_by_id_and_project(
        &mut self,
        id: &str,
        project_id: &str,
    ) -> Option<&mut Phase> {
        self.phases
            .iter_mut()
            .find(|p| p.id == id && p.project_id == project_id)
    }

    pub fn delete_phase_by_id_and_project(&mut self, id: &str, project_id: &str) -> Option<Phase> {
        let index = self
            .phases
            .iter()
            .position(|p| p.id == id && p.project_id == project_id)?;

        Some(self.phases.remove(index))
    }
}
