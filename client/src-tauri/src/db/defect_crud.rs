use crate::db::database::Database;
use crate::model::{
    defect::{Defect, DefectPriority, DefectStatus},
    time_stamps::Timestamps,
};
use crate::{define_crud_multiple_id, define_next_id};

impl Database {
    define_crud_multiple_id!(
        add_defect,
        update_defect,
        delete_defect,
        find_defect,
        find_defect_mut,
        rebuild_defect_index,
        defects,
        defect_index,
        row,
        Defect,
        project_id,
        id
    );

    define_next_id!(next_defect_id, defects, project_id, id, "DEFECT-");

    pub fn find_defect_by_project(&self, project_id: &str) -> Vec<Defect> {
        self.defects
            .iter()
            .filter(|m| m.project_id == project_id)
            .cloned()
            .collect()
    }
}
