use crate::generator::command::template::{load_patterns_from_file, template};
use std::fs;

pub fn build_all() {
    let pattern_dir = "../../tests/data/it";
    let output_dir = "../../tests";

    fs::create_dir_all(output_dir).expect("failed to create output dir");

    for entry in fs::read_dir(pattern_dir).expect("failed to read patterns dir") {
        let entry = entry.expect("failed to read entry");
        let path = entry.path();

        if path.extension().and_then(|s| s.to_str()) != Some("json") {
            continue;
        }

        // JSON ファイル名（例: defect.json → defect）
        let stem = path.file_stem().unwrap().to_str().unwrap().to_string();

        // JSON を読み込む
        let patterns = load_patterns_from_file(path.to_str().unwrap());

        // テストコード生成
        let code = template(&patterns);

        // 出力ファイル名
        let output_path = format!("{}/{}_test.rs", output_dir, stem);

        fs::write(&output_path, code).unwrap_or_else(|_| panic!("failed to write {}", output_path));

        println!("generated: {}", output_path);
    }
}
