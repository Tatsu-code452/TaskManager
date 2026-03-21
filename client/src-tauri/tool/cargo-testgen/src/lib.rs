pub mod generator;
pub mod analyzer;

use std::path::Path;

//cargo run -- ../src-tauri model src/model
//cargo run --bin testgen -- model src/model
pub fn generate(app_root: &Path, mode: &str, dir: &Path) {
    generator::runner::run(app_root, mode, dir);
}
