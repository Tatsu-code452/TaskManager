pub fn template_use(lines: &Vec<String>) -> String {
    lines.iter().map(|l| format!("{l}\n")).collect()
}
