use std::path::Path;

use crate::generator::{
    file_ops::{json_loader, walker, writer},
    model::case,
    util::file_stem_to_model_name,
};

pub fn run(app_root: &Path, mode: &str, dir: &Path) {
    for rel in walker::collect_rs_files(app_root, dir) {
        let model_name = file_stem_to_model_name::convert(&rel);

        if let Some(json) = json_loader::load(app_root, mode, &rel) {
            let case = case::build(&model_name, &json);
            writer::write(app_root, mode, &rel, &case);
        }
    }
}
