use crate::db::database::Database;
use crate::define_crud;
use crate::model::defect::Defect;

define_crud!(
    add_defect,
    find_defect,
    find_defect_mut,
    delete_defect,
    defects,
    defect_index,
    Defect
);

impl Database {
    pub fn find_defect_by_project(&mut self, project_id: &str) -> Vec<Defect> {
        self.defects
            .iter()
            .filter(|m| m.project_id == project_id)
            .cloned()
            .collect()
    }

    pub fn find_defect_by_id_and_project(&mut self, id: &str, project_id: &str) -> Option<Defect> {
        self.defects
            .iter()
            .find(|m| m.id == id && m.project_id == project_id)
            .cloned()
    }

    pub fn find_defect_mut_by_id_and_project(
        &mut self,
        id: &str,
        project_id: &str,
    ) -> Option<&mut Defect> {
        self.defects
            .iter_mut()
            .find(|m| m.id == id && m.project_id == project_id)
    }

    pub fn delete_defect_by_id_and_project(
        &mut self,
        id: &str,
        project_id: &str,
    ) -> Option<Defect> {
        let index = self
            .defects
            .iter()
            .position(|m| m.id == id && m.project_id == project_id)?;

        Some(self.defects.remove(index))
    }
}
