use std::collections::HashMap;

pub fn delete_basic<T>(vec: &mut Vec<T>, index: &mut HashMap<String, usize>, id: &str) -> bool {
    if let Some(idx) = index.remove(id) {
        vec.remove(idx);
        true
    } else {
        false
    }
}
