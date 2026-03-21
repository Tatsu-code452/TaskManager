use std::fs;
use std::path::Path;

use crate::generator::file_ops::path::test_output_path;

pub fn write(app_root: &Path, mode: &str, rel: &Path, content: &str) {
    let out_path = test_output_path(app_root, mode, rel);

    if let Some(parent) = out_path.parent() {
        fs::create_dir_all(parent).unwrap();
        println!("Dir Generated: {}", parent.display());
    }

    fs::write(&out_path, content).unwrap();
    println!("Generated: {}", out_path.display());
}
