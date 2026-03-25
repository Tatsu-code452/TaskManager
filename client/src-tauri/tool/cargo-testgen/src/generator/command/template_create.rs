use crate::generator::command::CreatePatterns;

pub fn template_create(
    static_name: &str,
    command_name: &str,
    table_name: &str,
    prefix: &str,
    p: &CreatePatterns,
) -> String {
    format!(
        r#"
fn test_create_{static_name}_no_key_not_created(db: &mut Database) {{
    println!("run {{}}", "test_create_{static_name}_no_key_not_created");

    let before = db.{table_name}.len();
    let payload = {prefix}RequestBuilder::new().build();

    let result = {command_name}::create_impl(db, payload);

    assert!(result.is_err());
    assert_eq!(db.{table_name}.len(), before);
}}

fn test_create_{static_name}_key_only_initial_values(db: &mut Database) {{
    println!("run {{}}", "test_create_{static_name}_key_only_initial_values");

    let before = db.{table_name}.len();
    let payload = {prefix}Request {{
        {create_payload_init},
        ..{prefix}RequestBuilder::default_request()
    }};
    let expected = {prefix} {{
        {create_expected_init},
        timestamps: Timestamps::new(),
    }};

    let result = {command_name}::create_impl(db, payload);

    assert!(result.is_ok());
    assert_eq!(db.{table_name}.len(), before + 1);
    assert_object(&result.unwrap(), &expected);
}}

fn test_create_{static_name}_full_info(db: &mut Database) {{
    println!("run {{}}", "test_create_{static_name}_full_info");

    let payload = {prefix}Request {{
        {create_payload_full},
        ..{prefix}RequestBuilder::default_request()
    }};
    let expected = {prefix} {{
        {create_expected_full},
        timestamps: Timestamps::new(),
    }};

    let result = {command_name}::create_impl(db, payload);
    let d = db.find_{static_name}({create_find_expr_full});

    assert!(result.is_ok());
    assert_object(&d.unwrap(), &expected);
}}

fn test_create_{static_name}_gap_id_assigns_next_max(db: &mut Database) {{
    println!("run {{}}", "test_create_{static_name}_gap_id_assigns_next_max");

    let payload = {create_payload_gap};

    let result = {command_name}::create_impl(db, payload);
    let d = db.find_{static_name}({create_find_expr_gap});

    assert!(result.is_ok());
    assert_eq!(&d.unwrap().id, {create_expected_gap}); // 最大値+1
}}
"#,
        create_payload_init = p.create_payload_init,
        create_expected_init = p.create_expected_init,
        create_payload_full = p.create_payload_full,
        create_expected_full = p.create_expected_full,
        create_find_expr_full = p.create_find_expr_full,
        create_payload_gap = p.create_payload_gap,
        create_find_expr_gap = p.create_find_expr_gap,
        create_expected_gap = p.create_expected_gap,
    )
}
