use crate::db::database::Database;
use crate::define_crud;
use crate::model::milestone::Milestone;

define_crud!(
    add_milestone,
    _find_milestone,
    _find_milestone_mut,
    _delete_milestone,
    milestones,
    milestone_index,
    Milestone
);

impl Database {
    pub fn find_milestone_by_project(&mut self, project_id: &str) -> Vec<Milestone> {
        self.milestones
            .iter()
            .filter(|m| m.project_id == project_id)
            .cloned()
            .collect()
    }

    pub fn find_milestone_by_id_and_project(
        &mut self,
        id: &str,
        project_id: &str,
    ) -> Option<Milestone> {
        self.milestones
            .iter()
            .find(|m| m.id == id && m.project_id == project_id)
            .cloned()
    }

    pub fn find_milestone_mut_by_id_and_project(
        &mut self,
        id: &str,
        project_id: &str,
    ) -> Option<&mut Milestone> {
        self.milestones
            .iter_mut()
            .find(|m| m.id == id && m.project_id == project_id)
    }

    pub fn delete_milestone_by_id_and_project(
        &mut self,
        id: &str,
        project_id: &str,
    ) -> Option<Milestone> {
        let index = self
            .milestones
            .iter()
            .position(|m| m.id == id && m.project_id == project_id)?;

        Some(self.milestones.remove(index))
    }
}
