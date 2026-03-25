use crate::generator::command::UpdatePatterns;

pub fn template_update(
    static_name: &str,
    command_name: &str,
    prefix: &str,
    p: &UpdatePatterns,
) -> String {
    format!(
        r#"
fn test_update_{static_name}_no_key_not_updated(db: &mut Database) {{
    println!("run {{}}", "test_update_{static_name}_no_key_not_updated");

    let payload = {update_payload_no};

    let result = {command_name}::update_impl(db, payload);

    assert!(result.is_err());
}}

fn test_update_{static_name}_key_only_initial_values(db: &mut Database) {{
    println!("run {{}}", "test_update_{static_name}_key_only_initial_values");

    let payload = {update_payload_init};
    let old = db.find_{static_name}({update_find_expr_init});
    let expected = {prefix} {{
        {update_expected_init},
        ..old.unwrap().clone()
    }};

    let result = {command_name}::update_impl(db, payload);
    let d = db.find_{static_name}({update_find_expr_init});

    assert!(result.is_ok());
    assert_object(&d.unwrap(), &expected);
}}

fn test_update_{static_name}_full_info(db: &mut Database) {{
    println!("run {{}}", "test_update_{static_name}_full_info");

    let payload = {prefix}Request {{
        {update_payload_full},
        ..{prefix}RequestBuilder::default_request()
    }};
    let expected = {prefix} {{
        {update_expected_full},
        timestamps: Timestamps::new(),
    }};

    let result = {command_name}::update_impl(db, payload);
    let d = db.find_{static_name}({update_find_expr_full});

    assert!(result.is_ok());
    assert_object(&d.unwrap(), &expected);
}}

fn test_update_{static_name}_not_found(db: &mut Database) {{
    println!("run {{}}", "test_update_{static_name}_not_found");

    let payload = {update_payload_not};

    let result = {command_name}::update_impl(db, payload);

    assert!(result.is_err());
}}
"#,
        update_payload_no = p.update_payload_no,
        update_payload_init = p.update_payload_init,
        update_find_expr_init = p.update_find_expr_init,
        update_expected_init = p.update_expected_init,
        update_payload_full = p.update_payload_full,
        update_expected_full = p.update_expected_full,
        update_find_expr_full = p.update_find_expr_full,
        update_payload_not = p.update_payload_not
    )
}
