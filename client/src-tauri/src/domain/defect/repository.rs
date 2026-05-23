use crate::{
    db::{
        database::Database,
        table::{add, all, delete, find, find_mut, rebuild_index, update},
    },
    domain::defect::model::Defect,
};

impl Database {
    pub fn add_defect(&mut self, row: &Defect) -> Option<Defect> {
        add(&mut self.defects, &mut self.defect_index, row.clone())
    }

    pub fn update_defect(&mut self, row: &Defect) -> Option<Defect> {
        update(&mut self.defects, &self.defect_index, row.clone())
    }

    pub fn delete_defect(&mut self, project_id: &str, id: &str) -> Option<Defect> {
        delete(
            &mut self.defects,
            &mut self.defect_index,
            (project_id.to_string(), id.to_string()),
        )
    }

    pub fn find_defect(&self, project_id: &str, id: &str) -> Option<&Defect> {
        find(
            &self.defects,
            &self.defect_index,
            (project_id.to_string(), id.to_string()),
        )
    }

    pub fn find_defect_mut(&mut self, project_id: &str, id: &str) -> Option<&mut Defect> {
        find_mut(
            &mut self.defects,
            &self.defect_index,
            (project_id.to_string(), id.to_string()),
        )
    }

    pub fn find_all_defect(&self) -> Vec<Defect> {
        all(&self.defects)
    }

    pub fn find_defect_by_project(&self, project_id: &str) -> Option<Vec<Defect>> {
        let list: Vec<Defect> = self
            .defects
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

    pub fn next_defect_id(&self, project_id: &str) -> String {
        let mut max_num = 0;
        let prefix = "DEFECT-";
        for item in &self.defects {
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

    pub fn rebuild_defect_index(&mut self) {
        rebuild_index(&mut self.defects, &mut self.defect_index);
    }
}
