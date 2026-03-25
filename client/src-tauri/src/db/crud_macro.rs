#[macro_export]
macro_rules! define_crud {
    (
        $add_fn:ident,
        $find_fn:ident,
        $find_mut_fn:ident,
        $find_all_fn:ident,
        $update_fn:ident,
        $delete_fn:ident,
        $rebuild_fn:ident,

        $field:ident,
        $index:ident,
        $type:ty
    ) => {
        $crate::crud_add!($add_fn, $field, $index, $type);
        $crate::crud_find!($find_fn, $field, $index, $type);
        $crate::crud_find_mut!($find_mut_fn, $field, $index, $type);
        $crate::crud_find_all!($find_all_fn, $field, $type);
        $crate::crud_update!($update_fn, $field, $index, $type);
        $crate::crud_delete!($delete_fn, $field, $index, $rebuild_fn, $type);
        $crate::crud_rebuild!($rebuild_fn, $field, $index, $type);
    };
}

#[macro_export]
macro_rules! crud_add {
    ($add_fn:ident, $field:ident, $index:ident, $type:ty) => {
        pub fn $add_fn(&mut self, item: $type) -> Option<$type> {
            let id = item.id.clone();

            if self.$index.contains_key(&id) {
                return None;
            }

            self.$field.push(item.clone());
            self.$index.insert(id, self.$field.len() - 1);

            Some(item)
        }
    };
}

#[macro_export]
macro_rules! crud_find {
    ($find_fn:ident, $field:ident, $index:ident, $type:ty) => {
        pub fn $find_fn(&self, id: &str) -> Option<&$type> {
            self.$index.get(id).and_then(|&i| self.$field.get(i))
        }
    };
}

#[macro_export]
macro_rules! crud_find_mut {
    ($find_mut_fn:ident, $field:ident, $index:ident, $type:ty) => {
        pub fn $find_mut_fn(&mut self, id: &str) -> Option<&mut $type> {
            self.$index.get(id).and_then(|&i| self.$field.get_mut(i))
        }
    };
}

#[macro_export]
macro_rules! crud_find_all {
    ($find_all_fn:ident, $field:ident, $type:ty) => {
        pub fn $find_all_fn(&self) -> Option<Vec<$type>> {
            let list: Vec<$type> = self.$field.iter().cloned().collect();

            if list.is_empty() {
                None
            } else {
                Some(list)
            }
        }
    };
}

#[macro_export]
macro_rules! crud_update {
    ($update_fn:ident, $field:ident, $index:ident, $type:ty) => {
        pub fn $update_fn(&mut self, item: $type) -> Option<$type> {
            let id = item.id.clone();
            let index = *self.$index.get(&id)?;
            self.$field[index] = item.clone();
            println!("crud OK");
            Some(item)
        }
    };
}

#[macro_export]
macro_rules! crud_delete {
    ($delete_fn:ident, $field:ident, $index:ident, $rebuild_fn:ident, $type:ty) => {
        pub fn $delete_fn(&mut self, id: &str) -> Option<$type> {
            let index = *self.$index.get(id)?;
            let removed = self.$field.remove(index);
            self.$rebuild_fn();
            Some(removed)
        }
    };
}

#[macro_export]
macro_rules! crud_rebuild {
    ($rebuild_fn:ident, $field:ident, $index:ident, $type:ty) => {
        pub fn $rebuild_fn(&mut self) {
            self.$index.clear();
            for (i, item) in self.$field.iter().enumerate() {
                self.$index.insert(item.id.clone(), i);
            }
        }
    };
}
