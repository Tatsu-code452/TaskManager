use crate::{
    db::{
        database::Database,
        table::{add, all, delete, find, find_mut, rebuild_index, update},
    },
    model::task::Task,
    util::id::generate_uuid,
};

impl Database {
    pub fn add_task(&mut self, row: &Task) -> Option<Task> {
        add(&mut self.tasks, &mut self.task_index, row.clone())
    }

    pub fn update_task(&mut self, row: &Task) -> Option<Task> {
        update(&mut self.tasks, &self.task_index, row.clone())
    }

    pub fn delete_task(&mut self, project_id: &str, id: &str) -> Option<Task> {
        delete(
            &mut self.tasks,
            &mut self.task_index,
            (project_id.to_string(), id.to_string()),
        )
    }

    pub fn find_task(&self, project_id: &str, id: &str) -> Option<&Task> {
        find(
            &self.tasks,
            &self.task_index,
            (project_id.to_string(), id.to_string()),
        )
    }

    pub fn find_task_mut(&mut self, project_id: &str, id: &str) -> Option<&mut Task> {
        find_mut(
            &mut self.tasks,
            &self.task_index,
            (project_id.to_string(), id.to_string()),
        )
    }

    pub fn find_all_task(&self) -> Vec<Task> {
        all(&self.tasks)
    }

    pub fn find_task_by_project(&self, project_id: &str) -> Option<Vec<Task>> {
        let list: Vec<Task> = self
            .tasks
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

    pub fn next_task_id(&self) -> String {
        generate_uuid()
    }

    pub fn rebuild_task_index(&mut self) {
        rebuild_index(&mut self.tasks, &mut self.task_index);
    }

    pub fn find_task_by_task(&mut self, task_id: &str) -> Vec<Task> {
        self.tasks
            .iter()
            .filter(|t| t.id == task_id)
            .cloned()
            .collect()
    }

    pub fn delete_task_and_relate_data(&mut self, id: &str, project_id: &str) -> Option<Task> {
        let index = self
            .tasks
            .iter()
            .position(|t| t.id == id && t.project_id == project_id)?;

        let removed = self.tasks.remove(index);

        // Task に紐づく関連データも削除
        self.task_plan_cells.retain(|c| c.task_id != id);
        self.task_actual_cells.retain(|c| c.task_id != id);
        self.issues.retain(|i| i.task_id.as_deref() != Some(id));
        self.defects.retain(|d| d.task_id.as_deref() != Some(id));

        self.rebuild_task_index();
        self.rebuild_issue_index();
        self.rebuild_defect_index();

        Some(removed)
    }
}
