pub mod json_loader;
pub mod walker;
pub mod writer;

pub mod assert;
pub mod model;

use std::path::Path;

pub fn generate(app_root: &Path, mode: &str, dir: &Path) {
    let files = walker::collect_rs_files(&app_root, dir);

    for rel in files {
        let model = file_stem_to_model(&rel);

        if let Some(json) = json_loader::load_json_raw(&app_root, mode, &rel) {
            match mode {
                "model" => {
                    let case = model::case::build(&model, &json);
                    writer::write(&app_root, mode, &rel, &case);
                }
                _ => {
                    eprintln!("Unsupported mode: {}", mode);
                }
            }
        }
    }
}

fn file_stem_to_model(path: &Path) -> String {
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
