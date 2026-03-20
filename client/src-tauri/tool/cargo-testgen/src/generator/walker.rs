use std::fs;
use std::path::{Path, PathBuf};

pub fn collect_rs_files(app_root: &Path, rel: &Path) -> Vec<PathBuf> {
    let root = app_root.join(rel);
    let mut result = Vec::new();
    walk(&root, &root, &mut result);
    result
}

fn walk(root: &Path, current: &Path, result: &mut Vec<PathBuf>) {
    for entry in fs::read_dir(current).unwrap() {
        let entry = entry.unwrap();
        let path = entry.path();

        if path.is_dir() {
            walk(root, &path, result);
        } else if path.extension().map(|e| e == "rs").unwrap_or(false) {
            // root からの相対パスを保存
            let rel = path.strip_prefix(root).unwrap().to_path_buf();
            result.push(rel);
        }
    }
}
