#[macro_export]
macro_rules! define_crud_multiple_id {
    (
        $add_fn:ident,
        $update_fn:ident,
        $delete_fn:ident,
        $find_fn:ident,
        $find_mut_fn:ident,
        $find_by_key1_fn:ident,
        $next_id_fn:ident,
        $rebuild_fn:ident,

        $table:ident,
        $index:ident,

        $row_name:ident,
        $row_type:ty,

        $key1:ident,
        $key2:ident,

        $prefix:expr
    ) => {
        $crate::crud_multi_add!($add_fn, $table, $index, $row_name, $row_type, $key1, $key2);
        $crate::crud_multi_update!($update_fn, $table, $index, $row_name, $row_type, $key1, $key2);
        $crate::crud_multi_delete!($delete_fn, $table, $index, $rebuild_fn, $row_type);
        $crate::crud_multi_find!($find_fn, $table, $index, $row_type);
        $crate::crud_multi_find_mut!($find_mut_fn, $table, $index, $row_type);
        $crate::crud_multi_find_by_key1!($find_by_key1_fn, $table, $row_type, $key1);
        $crate::crud_multi_next_id!($next_id_fn, $table, $key1, $key2, $prefix);
        $crate::crud_multi_rebuild!($rebuild_fn, $table, $index, $key1, $key2);
    };
}

#[macro_export]
macro_rules! crud_multi_add {
    ($add_fn:ident, $table:ident, $index:ident, $row_name:ident, $row_type:ty, $key1:ident, $key2:ident) => {
        pub fn $add_fn(&mut self, $row_name: $row_type) -> Option<$row_type> {
            let key = ($row_name.$key1.clone(), $row_name.$key2.clone());

            if self.$index.contains_key(&key) {
                return None;
            }

            let index = self.$table.len();
            self.$index.insert(key, index);
            self.$table.push($row_name.clone());

            Some($row_name)
        }
    };
}

#[macro_export]
macro_rules! crud_multi_update {
    ($update_fn:ident, $table:ident, $index:ident, $row_name:ident, $row_type:ty, $key1:ident, $key2:ident) => {
        pub fn $update_fn(&mut self, $row_name: $row_type) -> Option<$row_type> {
            let key = ($row_name.$key1.clone(), $row_name.$key2.clone());
            let index = *self.$index.get(&key)?;
            self.$table[index] = $row_name.clone();
            Some($row_name)
        }
    };
}

#[macro_export]
macro_rules! crud_multi_delete {
    ($delete_fn:ident, $table:ident, $index:ident, $rebuild_fn:ident, $row_type:ty) => {
        pub fn $delete_fn(&mut self, key1_val: &str, key2_val: &str) -> Option<$row_type> {
            let key = (key1_val.to_string(), key2_val.to_string());
            let index = *self.$index.get(&key)?;
            let removed = self.$table.remove(index);
            self.$rebuild_fn();
            Some(removed)
        }
    };
}

#[macro_export]
macro_rules! crud_multi_find {
    ($find_fn:ident, $table:ident, $index:ident, $row_type:ty) => {
        pub fn $find_fn(&self, key1_val: &str, key2_val: &str) -> Option<&$row_type> {
            self.$index
                .get(&(key1_val.to_string(), key2_val.to_string()))
                .and_then(|&i| self.$table.get(i))
        }
    };
}

#[macro_export]
macro_rules! crud_multi_find_mut {
    ($find_mut_fn:ident, $table:ident, $index:ident, $row_type:ty) => {
        pub fn $find_mut_fn(&mut self, key1_val: &str, key2_val: &str) -> Option<&mut $row_type> {
            self.$index
                .get(&(key1_val.to_string(), key2_val.to_string()))
                .and_then(|&i| self.$table.get_mut(i))
        }
    };
}

#[macro_export]
macro_rules! crud_multi_rebuild {
    ($rebuild_fn:ident, $table:ident, $index:ident, $key1:ident, $key2:ident) => {
        pub fn $rebuild_fn(&mut self) {
            self.$index.clear();
            for (i, item) in self.$table.iter().enumerate() {
                self.$index
                    .insert((item.$key1.clone(), item.$key2.clone()), i);
            }
        }
    };
}

#[macro_export]
macro_rules! crud_multi_find_by_key1 {
    ($find_by_key1_fn:ident, $table:ident, $row_type:ty, $key1:ident) => {
        pub fn $find_by_key1_fn(&self, key1_val: &str) -> Option<Vec<$row_type>> {
            let list: Vec<$row_type> = self
                .$table
                .iter()
                .filter(|item| item.$key1 == key1_val)
                .cloned()
                .collect();

            if list.is_empty() {
                None
            } else {
                Some(list)
            }
        }
    };
}

#[macro_export]
macro_rules! crud_multi_next_id {
    ($next_id_fn:ident, $table:ident, $key1:ident, $key2:ident, $prefix:expr) => {
        pub fn $next_id_fn(&self, key1_val: &str) -> String {
            let mut max_num = 0;

            for item in &self.$table {
                if item.$key1 == key1_val {
                    if let Some(num_str) = item.$key2.strip_prefix($prefix) {
                        if let Ok(num) = num_str.parse::<u32>() {
                            max_num = max_num.max(num);
                        }
                    }
                }
            }

            format!("{}{}", $prefix, max_num + 1)
        }
    };
}
