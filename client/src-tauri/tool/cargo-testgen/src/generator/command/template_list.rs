use crate::generator::command::ListPatterns;

pub fn template_list(static_name: &str, command_name: &str, p: &ListPatterns) -> String {
    format!(
        r#"
fn test_list_{static_name}_no_key_returns_all(db: &Database) {{
    println!("run {{}}", "test_list_{static_name}_no_key_returns_all");

    let result = {command_name}::list_impl(db, {list_key_no});

    assert!(result.is_err());
}}

fn test_list_{static_name}_single_key(db: &Database) {{
    println!("run {{}}", "test_list_{static_name}_single_key");

    let result = {command_name}::list_impl(db, {list_key_single});
    let list = result.clone().unwrap();

    assert!(result.is_ok());
    assert!(list.iter().all({list_find_expr}));
}}
"#,
        list_key_no = p.list_key_no,
        list_key_single = p.list_key_single,
        list_find_expr = p.list_find_expr,
    )
}
