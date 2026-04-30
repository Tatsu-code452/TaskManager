use std::path::Path;

/// 拡張子除去 → snake_case → PascalCase
pub fn convert(path: &Path) -> String {
    let stem = path.file_stem().unwrap().to_string_lossy();
    stem.split('_')
        .map(|s| {
            let mut c = s.chars();
            match c.next() {
                None => String::new(),
                Some(f) => f.to_uppercase().collect::<String>() + c.as_str(),
            }
        })
        .collect()
}
