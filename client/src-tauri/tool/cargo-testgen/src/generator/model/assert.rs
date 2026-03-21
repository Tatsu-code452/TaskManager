use serde_json::Value;

pub fn build(expected: &Value) -> String {
    let mut out = Vec::new();
    walk("", expected, &mut out);
    out.join("\n")
}

fn walk(prefix: &str, v: &Value, out: &mut Vec<String>) {
    match v {
        Value::Object(map) => {
            for (k, val) in map {
                // ★ timestamps を除外
                if k == "timestamps" {
                    continue;
                }

                let new_prefix = if prefix.is_empty() {
                    k.to_string()
                } else {
                    format!("{prefix}.{k}")
                };
                walk(&new_prefix, val, out);
            }
        }
        _ => {
            out.push(format!(
                "    assert_eq!(result.{}, data.expected.{});",
                prefix, prefix
            ));
        }
    }
}
