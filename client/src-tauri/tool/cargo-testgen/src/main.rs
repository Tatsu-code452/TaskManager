mod analyzer;
mod generator;
mod json_generator;

use std::{fs, path::Path};

use syn::File;

use crate::json_generator::model::{parser::parse_model_info, structs::ModelInfo};

// cargo testgen model \src\model
// cd tool/cargo-testgen
// cargo run -- model src/model
fn main() {
    let args = std::env::args().skip(1).collect::<Vec<_>>();

    generator::command::writer::build_all();
    // if args.len() < 2 {
    //     eprintln!("Usage: cargo testgen <mode> <directory>");
    //     std::process::exit(1);
    // }

    // let mode = &args[0];
    // let dir = Path::new(&args[1]);

    // // ★ src-tauri の Cargo.toml がある場所を基準にする
    // let app_root = Path::new("../../"); // cargo-testgen から見た src-tauri

    // if mode == "json" {
    //     json_generator::runner::run(app_root, mode, dir);
    // } else {
    //     generator::runner::run(app_root, mode, dir);
    // }
}
