use crate::{
    db::{
        database::Database,
        table::{add, all, delete, find, find_mut, rebuild_index, update},
    },
    domain::phase::model::Phase,
};

impl Database {
    pub fn add_phase(&mut self, row: &Phase) -> Option<Phase> {
        add(&mut self.phases, &mut self.phase_index, row.clone())
    }

    pub fn update_phase(&mut self, row: &Phase) -> Option<Phase> {
        update(&mut self.phases, &self.phase_index, row.clone())
    }

    pub fn delete_phase(&mut self, project_id: &str, id: &str) -> Option<Phase> {
        delete(
            &mut self.phases,
            &mut self.phase_index,
            (project_id.to_string(), id.to_string()),
        )
    }

    pub fn find_phase(&self, project_id: &str, id: &str) -> Option<&Phase> {
        find(
            &self.phases,
            &self.phase_index,
            (project_id.to_string(), id.to_string()),
        )
    }

    pub fn find_phase_mut(&mut self, project_id: &str, id: &str) -> Option<&mut Phase> {
        find_mut(
            &mut self.phases,
            &self.phase_index,
            (project_id.to_string(), id.to_string()),
        )
    }

    pub fn find_all_phase(&self) -> Vec<Phase> {
        all(&self.phases)
    }

    pub fn find_phase_by_project(&self, project_id: &str) -> Option<Vec<Phase>> {
        let list: Vec<Phase> = self
            .phases
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

    pub fn next_phase_id(&self, project_id: &str) -> String {
        let mut max_num = 0;
        let prefix = "Phase-";
        for item in &self.phases {
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

    pub fn rebuild_phase_index(&mut self) {
        rebuild_index(&mut self.phases, &mut self.phase_index);
    }
}
