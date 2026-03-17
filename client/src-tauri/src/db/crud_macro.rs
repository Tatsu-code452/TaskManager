#[macro_export]
macro_rules! define_crud {
    (
        $add_fn:ident,
        $find_fn:ident,
        $find_mut_fn:ident,
        $delete_fn:ident,
        $rebuild_fn:ident,

        $field:ident,
        $index:ident,
        $type:ty
    ) => {
        impl Database {
            pub fn $add_fn(&mut self, item: $type) {
                let id = item.id.clone();
                self.$field.push(item);
                self.$index.insert(id, self.$field.len() - 1);
            }

            pub fn $find_fn(&self, id: &str) -> Option<&$type> {
                self.$index.get(id).and_then(|&i| self.$field.get(i))
            }

            pub fn $find_mut_fn(&mut self, id: &str) -> Option<&mut $type> {
                if let Some(&i) = self.$index.get(id) {
                    self.$field.get_mut(i)
                } else {
                    None
                }
            }

            pub fn $delete_fn(&mut self, id: &str) -> Option<$type> {
                let idx = self.$index.remove(id)?;
                let removed = self.$field.remove(idx);
                self.$rebuild_fn();
                Some(removed)
            }

            pub fn $rebuild_fn(&mut self) {
                self.$index.clear();
                for (i, item) in self.$field.iter().enumerate() {
                    self.$index.insert(item.id.clone(), i);
                }
            }
        }
    };
}

#[macro_export]
macro_rules! define_crud_multiple_id {
    (
        $add_fn:ident,
        $update_fn:ident,
        $delete_fn:ident,
        $find_fn:ident,
        $find_mut_fn:ident,
        $rebuild_fn:ident,

        $table:ident,
        $index:ident,

        $row_name:ident,
        $row_type:ty,

        $key1:ident,
        $key2:ident
    ) => {
        pub fn $add_fn(&mut self, $row_name: $row_type) {
            let index = self.$table.len();
            self.$index
                .insert(($row_name.$key1.clone(), $row_name.$key2.clone()), index);
            self.$table.push($row_name);
        }

        pub fn $update_fn(&mut self, $row_name: $row_type) -> Option<()> {
            let key = ($row_name.$key1.clone(), $row_name.$key2.clone());
            let index = *self.$index.get(&key)?;
            self.$table[index] = $row_name;
            Some(())
        }

        pub fn $delete_fn(&mut self, key1_val: &str, key2_val: &str) -> Option<$row_type> {
            let index = *self
                .$index
                .get(&(key1_val.to_string(), key2_val.to_string()))?;
            let removed = self.$table.remove(index);
            self.$rebuild_fn();
            Some(removed)
        }

        pub fn $find_fn(&self, key1_val: &str, key2_val: &str) -> Option<&$row_type> {
            self.$index
                .get(&(key1_val.to_string(), key2_val.to_string()))
                .and_then(|&i| self.$table.get(i))
        }

        pub fn $find_mut_fn(&mut self, key1_val: &str, key2_val: &str) -> Option<&mut $row_type> {
            if let Some(&i) = self
                .$index
                .get(&(key1_val.to_string(), key2_val.to_string()))
            {
                self.$table.get_mut(i)
            } else {
                None
            }
        }

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
macro_rules! define_next_id {
    (
        $next_id_fn:ident,
        $table:ident,
        $key1:ident,
        $key2:ident,
        $prefix:expr
    ) => {
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
