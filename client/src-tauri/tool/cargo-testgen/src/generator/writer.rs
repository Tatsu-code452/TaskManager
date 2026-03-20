use std::fs;
use std::path::Path;

pub fn write(app_root: &Path, mode: &str, rel_path: &Path, content: &str) {
    let file_stem = rel_path.file_stem().unwrap().to_string_lossy();

    let out_path = app_root
        .join("tests")
        .join(rel_path.parent().unwrap_or(Path::new("")))
        .join(format!("{}_{}_test.rs", mode, file_stem));

    println!("target: {}", out_path.display());

    if let Some(parent) = out_path.parent() {
        fs::create_dir_all(parent).unwrap();
        println!("Dir Generated: {}", parent.display());
    }

    fs::write(&out_path, content).unwrap();
    println!("Generated: {}", out_path.display());
}
