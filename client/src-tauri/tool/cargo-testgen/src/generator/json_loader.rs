use std::fs;
use std::path::Path;

/// JSON の生テキストを返すだけ
pub fn load_json_raw(app_root: &Path, mode: &str, rel_path: &Path) -> Option<String> {
    let file_stem = rel_path.file_stem()?.to_string_lossy();
    let json_path = app_root
        .join("tests/data")
        .join(mode)
        .join(rel_path.parent().unwrap_or(Path::new("")))
        .join(format!("{}.json", file_stem));

    // eprintln!("JSON found: {}", json_path.display());
    if !json_path.exists() {
        eprintln!("JSON not found: {}", json_path.display());
        return None;
    }
    eprintln!("JSON found: {}", json_path.display());

    let text = fs::read_to_string(&json_path)
        .unwrap_or_else(|e| panic!("Failed to read {}: {}", json_path.display(), e));

    Some(text)
}
