use crate::{
    db::{
        database::Database,
        table::{add, all, delete, find, find_mut, rebuild_index, update},
    },
    model::issue::Issue,
};

impl Database {
    pub fn add_issue(&mut self, row: &Issue) -> Option<Issue> {
        add(&mut self.issues, &mut self.issue_index, row.clone())
    }

    pub fn update_issue(&mut self, row: &Issue) -> Option<Issue> {
        update(&mut self.issues, &self.issue_index, row.clone())
    }

    pub fn delete_issue(&mut self, project_id: &str, id: &str) -> Option<Issue> {
        delete(
            &mut self.issues,
            &mut self.issue_index,
            (project_id.to_string(), id.to_string()),
        )
    }

    pub fn find_issue(&self, project_id: &str, id: &str) -> Option<&Issue> {
        find(
            &self.issues,
            &self.issue_index,
            (project_id.to_string(), id.to_string()),
        )
    }

    pub fn find_issue_mut(&mut self, project_id: &str, id: &str) -> Option<&mut Issue> {
        find_mut(
            &mut self.issues,
            &self.issue_index,
            (project_id.to_string(), id.to_string()),
        )
    }

    pub fn find_all_issue(&self) -> Vec<Issue> {
        all(&self.issues)
    }

    pub fn find_issue_by_project(&self, project_id: &str) -> Option<Vec<Issue>> {
        let list: Vec<Issue> = self
            .issues
            .iter()
            .filter(|item| item.project_id == project_id)
            .cloned()
            .collect();

        if list.is_empty() {
            None
        } else {
            Some(list)
        }
    }

    pub fn next_issue_id(&self, project_id: &str) -> String {
        let mut max_num = 0;
        let prefix = "ISSUE-";
        for item in &self.issues {
            if item.project_id == project_id {
                if let Some(num_str) = item.id.strip_prefix(prefix) {
                    if let Ok(num) = num_str.parse::<u32>() {
                        max_num = max_num.max(num);
                    }
                }
            }
        }

        format!("{}{}", prefix, max_num + 1)
    }

    pub fn rebuild_issue_index(&mut self) {
        rebuild_index(&mut self.issues, &mut self.issue_index);
    }
}
