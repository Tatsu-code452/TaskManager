use crate::generator::command::DeletePatterns;

pub fn template_delete(
    static_name: &str,
    command_name: &str,
    table_name: &str,
    p: &DeletePatterns,
) -> String {
    format!(
        r#"
fn test_delete_{static_name}_no_key_not_deleted(db: &mut Database) {{
    println!("run {{}}", "test_delete_{static_name}_no_key_not_deleted");

    let result = {command_name}::delete_impl(db, {delete_key_no});

    assert!(result.is_err());
}}

fn test_delete_{static_name}_success(db: &mut Database) {{
    println!("run {{}}", "test_delete_{static_name}_success");

    let result = {command_name}::delete_impl(db, {delete_key_ok});

    assert!(result.is_ok());
    assert!(db.{table_name}.iter().all({delete_find_expr_ok}));
}}

fn test_delete_{static_name}_not_found(db: &mut Database) {{
    println!("run {{}}", "test_delete_{static_name}_not_found");

    let result = {command_name}::delete_impl(db, {delete_key_ng});

    assert!(result.is_err());
}}
"#,
        delete_key_no = p.delete_key_no,
        delete_key_ok = p.delete_key_ok,
        delete_key_ng = p.delete_key_ng,
        delete_find_expr_ok = p.delete_find_expr_ok,
    )
}
