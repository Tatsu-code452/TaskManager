use std::path::{Path, PathBuf};

pub fn json_path(app_root: &Path, mode: &str, rel: &Path) -> PathBuf {
    let stem = rel.file_stem().unwrap().to_string_lossy();
    app_root
        .join(format!("tests/data/"))
        .join(mode)
        .join(rel.parent().unwrap_or(Path::new("")))
        .join(format!("{stem}.json"))
}

pub fn test_output_path(app_root: &Path, mode: &str, rel: &Path) -> PathBuf {
    let stem = rel.file_stem().unwrap().to_string_lossy();
    app_root
        .join("tests")
        .join(format!("{mode}_{stem}_test.rs"))
}
