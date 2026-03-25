use crate::generator::command::{
    template_create::template_create, template_delete::template_delete,
    template_helper::template_test_helper, template_list::template_list,
    template_update::template_update, template_use::template_use, TestPatterns,
};

use std::fs;

pub fn load_patterns_from_file(path: &str) -> TestPatterns {
    let json = fs::read_to_string(path).expect("failed to read patterns json file");

    serde_json::from_str(&json).expect("invalid patterns json")
}

pub fn template(p: &TestPatterns) -> String {
    let use_block = template_use(&p.r#use);
    let test_helper_block = template_test_helper(&p.test_helper);

    let list_block = template_list(&p.entity.static_name, &p.entity.command_name, &p.list);

    let create_block = template_create(
        &p.entity.static_name,
        &p.entity.command_name,
        &p.entity.table_name,
        &p.entity.model_type,
        &p.create,
    );

    let update_block = template_update(
        &p.entity.static_name,
        &p.entity.command_name,
        &p.entity.model_type,
        &p.update,
    );

    let delete_block = template_delete(
        &p.entity.static_name,
        &p.entity.command_name,
        &p.entity.table_name,
        &p.delete,
    );

    format!(
        r#"{use_block}

mod it;
#[macro_use]
mod macros;

{test_helper_block}

#[test]
fn test_{static_name}() {{
    let mut db = load_mock_db("tests/data/mock_db_all.json");

    test_list_{static_name}_no_key_returns_all(&mut db);
    test_list_{static_name}_single_key(&mut db);

    test_create_{static_name}_no_key_not_created(&mut db);
    test_create_{static_name}_key_only_initial_values(&mut db);
    test_create_{static_name}_full_info(&mut db);
    test_create_{static_name}_gap_id_assigns_next_max(&mut db);

    test_update_{static_name}_no_key_not_updated(&mut db);
    test_update_{static_name}_full_info(&mut db);
    test_update_{static_name}_key_only_initial_values(&mut db);
    test_update_{static_name}_not_found(&mut db);

    test_delete_{static_name}_no_key_not_deleted(&mut db);
    test_delete_{static_name}_success(&mut db);
    test_delete_{static_name}_not_found(&mut db);
}}

{list_block}
{create_block}
{update_block}
{delete_block}
"#,
        static_name = p.entity.static_name,
        use_block = use_block,
        test_helper_block = test_helper_block,
        list_block = list_block,
        create_block = create_block,
        update_block = update_block,
        delete_block = delete_block,
    )
}
