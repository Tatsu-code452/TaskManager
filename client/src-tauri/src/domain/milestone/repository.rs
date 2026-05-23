use crate::{
    db::{
        database::Database,
        table::{add, all, delete, find, find_mut, rebuild_index, update},
    },
    domain::milestone::model::Milestone,
};

impl Database {
    pub fn add_milestone(&mut self, row: &Milestone) -> Option<Milestone> {
        add(&mut self.milestones, &mut self.milestone_index, row.clone())
    }

    pub fn update_milestone(&mut self, row: &Milestone) -> Option<Milestone> {
        update(&mut self.milestones, &self.milestone_index, row.clone())
    }

    pub fn delete_milestone(&mut self, project_id: &str, id: &str) -> Option<Milestone> {
        delete(
            &mut self.milestones,
            &mut self.milestone_index,
            (project_id.to_string(), id.to_string()),
        )
    }

    pub fn find_milestone(&self, project_id: &str, id: &str) -> Option<&Milestone> {
        find(
            &self.milestones,
            &self.milestone_index,
            (project_id.to_string(), id.to_string()),
        )
    }

    pub fn find_milestone_mut(&mut self, project_id: &str, id: &str) -> Option<&mut Milestone> {
        find_mut(
            &mut self.milestones,
            &self.milestone_index,
            (project_id.to_string(), id.to_string()),
        )
    }

    pub fn find_all_milestone(&self) -> Vec<Milestone> {
        all(&self.milestones)
    }

    pub fn find_milestone_by_project(&self, project_id: &str) -> Option<Vec<Milestone>> {
        let list: Vec<Milestone> = self
            .milestones
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

    pub fn next_milestone_id(&self, project_id: &str) -> String {
        let mut max_num = 0;
        let prefix = "MILESTONE-";
        for item in &self.milestones {
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

    pub fn rebuild_milestone_index(&mut self) {
        rebuild_index(&mut self.milestones, &mut self.milestone_index);
    }
}
