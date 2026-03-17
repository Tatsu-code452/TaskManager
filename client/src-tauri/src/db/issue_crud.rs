use crate::db::database::Database;
use crate::define_crud;
use crate::model::issue::Issue;

define_crud!(
    add_issue,
    find_issue,
    find_issue_mut,
    delete_issue,
    issues,
    issue_index,
    Issue
);

impl Database {
    pub fn find_issue_by_project(&mut self, project_id: &str) -> Vec<Issue> {
        self.issues
            .iter()
            .filter(|m| m.project_id == project_id)
            .cloned()
            .collect()
    }

    pub fn find_issue_by_id_and_project(&mut self, id: &str, project_id: &str) -> Option<Issue> {
        self.issues
            .iter()
            .find(|m| m.id == id && m.project_id == project_id)
            .cloned()
    }

    pub fn find_issue_mut_by_id_and_project(
        &mut self,
        id: &str,
        project_id: &str,
    ) -> Option<&mut Issue> {
        self.issues
            .iter_mut()
            .find(|m| m.id == id && m.project_id == project_id)
    }

    pub fn delete_issue_by_id_and_project(&mut self, id: &str, project_id: &str) -> Option<Issue> {
        let index = self
            .issues
            .iter()
            .position(|m| m.id == id && m.project_id == project_id)?;

        Some(self.issues.remove(index))
    }
}
