use std::{fs, path::Path};
use syn::File;

use crate::{
    generator::{
        file_ops::walker,
        util::file_stem_to_model_name,
    },
    json_generator::{model::{builder::build_json, parser::parse_model_info, structs::ModelInfo}, writer},
};

pub fn run(app_root: &Path, mode: &str, dir: &Path) {
    for rel in walker::collect_rs_files(app_root, dir) {
        let model_name = file_stem_to_model_name::convert(&rel);

        let src = fs::read_to_string("src/model/project.rs").expect("Failed to read file");
        let file: File = syn::parse_file(&src).expect("Failed to parse Rust file");
        let model_info: ModelInfo = parse_model_info(&file);
        let json = build_json(&model_info);
        writer::write(app_root, mode, &rel, &json);
    }
}
