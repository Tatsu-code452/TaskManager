use std::fs;
use std::path::Path;

use crate::generator::file_ops::path::json_path;

/// JSON の生テキストを返すだけ
pub fn load(app_root: &Path, mode: &str, rel: &Path) -> Option<String> {
    let json_path = json_path(app_root, mode, rel);

    if !json_path.exists() {
        eprintln!("JSON not found: {}", json_path.display());
        return None;
    }

    Some(fs::read_to_string(&json_path).unwrap())
}
