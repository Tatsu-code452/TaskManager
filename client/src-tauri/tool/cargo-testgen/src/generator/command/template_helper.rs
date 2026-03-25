use crate::generator::command::TestHelperPatterns;

pub fn template_test_helper(p: &TestHelperPatterns) -> String {
    let required = p
        .required_fields
        .iter()
        .map(|(k, v)| format!("        {}: {},", k, v))
        .collect::<Vec<_>>()
        .join("\n");

    let optional = p
        .optional_fields
        .iter()
        .map(|(k, v)| format!("        {}: {},", k, v))
        .collect::<Vec<_>>()
        .join("\n");

    format!(
        r#"
test_helper!(
    {builder_type},
    {request_type},
    {model_type},
    {{
{required}
    }},
    {{
{optional}
    }}
);
"#,
        builder_type = p.builder_type,
        request_type = p.request_type,
        model_type = p.model_type,
        required = required,
        optional = optional,
    )
}
