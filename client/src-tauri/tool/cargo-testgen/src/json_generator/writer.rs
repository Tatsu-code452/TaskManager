use serde_json::Value;
use std::fs;
use std::path::{Path, PathBuf};

pub fn write(app_root: &Path, mode: &str, rel: &Path, json: &Value) {
    let out_path = output_path(app_root, mode, rel);

    if let Some(parent) = out_path.parent() {
        fs::create_dir_all(parent)
            .unwrap_or_else(|e| panic!("Failed to create directory {}: {}", parent.display(), e));
        println!("Dir Generated: {}", parent.display());
    }

    fs::write(&out_path, json.to_string())
        .unwrap_or_else(|e| panic!("Failed to write file {}: {}", out_path.display(), e));

    println!("Generated: {}", out_path.display());
}

pub fn output_path(app_root: &Path, mode: &str, rel: &Path) -> PathBuf {
    let stem = rel.file_stem().unwrap().to_string_lossy();
    app_root.join("tests").join(format!("{mode}/{stem}.rs"))
}
