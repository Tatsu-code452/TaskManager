#[macro_export]
macro_rules! define_crud_composite {
    (
        $add_fn:ident,
        $find_fn:ident,
        $find_mut_fn:ident,
        $find_all_fn:ident,
        $update_fn:ident,
        $delete_fn:ident,

        $field:ident,
        $ty:ty,
        $first_key:ident,
        $( $rest_keys:ident ),*
    ) => {
        $crate::crud_composite_add!($add_fn, $field, $ty);
        $crate::crud_composite_find!($find_fn, $field, $ty, $first_key, $( $rest_keys ),*);
        $crate::crud_composite_find_mut!($find_mut_fn, $field, $ty, $first_key, $( $rest_keys ),*);
        $crate::crud_composite_find_all!($find_all_fn, $field, $ty, $first_key);
        $crate::crud_composite_update!($update_fn, $field, $ty, $first_key, $( $rest_keys ),*);
        $crate::crud_composite_delete!($delete_fn, $field, $ty, $first_key, $( $rest_keys ),*);
    };
}

#[macro_export]
macro_rules! crud_composite_add {
    ($add_fn:ident, $field:ident, $ty:ty) => {
        pub fn $add_fn(&mut self, item: $ty) -> Option<$ty> {
            self.$field.push(item.clone());
            Some(item)
        }
    };
}

#[macro_export]
macro_rules! crud_composite_find {
    ($find_fn:ident, $field:ident, $ty:ty, $first_key:ident, $( $rest_keys:ident ),*) => {
        pub fn $find_fn(&self, $first_key: &str, $( $rest_keys: &str ),* ) -> Option<&$ty> {
            self.$field.iter().find(|v|
                v.$first_key == $first_key
                $( && v.$rest_keys == $rest_keys )*
            )
        }
    };
}

#[macro_export]
macro_rules! crud_composite_find_mut {
    ($find_mut_fn:ident, $field:ident, $ty:ty, $first_key:ident, $( $rest_keys:ident ),*) => {
        pub fn $find_mut_fn(&mut self, $first_key: &str, $( $rest_keys: &str ),* ) -> Option<&mut $ty> {
            self.$field.iter_mut().find(|v|
                v.$first_key == $first_key
                $( && v.$rest_keys == $rest_keys )*
            )
        }
    };
}

#[macro_export]
macro_rules! crud_composite_find_all {
    ($find_all_fn:ident, $field:ident, $ty:ty, $first_key:ident) => {
        pub fn $find_all_fn(&self, key1_val: &str) -> Option<Vec<$ty>> {
            let list: Vec<$ty> = self
                .$field
                .iter()
                .filter(|v| v.$first_key == key1_val)
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
macro_rules! crud_composite_update {
    ($update_fn:ident, $field:ident, $ty:ty, $first_key:ident, $( $rest_keys:ident ),*) => {
        pub fn $update_fn(&mut self, item: $ty) -> Option<$ty> {
            let pos = self.$field.iter().position(|v|
                v.$first_key == item.$first_key
                $( && v.$rest_keys == item.$rest_keys )*
            )?;

            self.$field[pos] = item.clone();
            Some(item)
        }
    };
}

#[macro_export]
macro_rules! crud_composite_delete {
    ($delete_fn:ident, $field:ident, $ty:ty, $first_key:ident, $( $rest_keys:ident ),*) => {
        pub fn $delete_fn(&mut self, $first_key: &str, $( $rest_keys: &str ),* ) -> Option<$ty> {
            let pos = self.$field.iter().position(|v|
                v.$first_key == $first_key
                $( && v.$rest_keys == $rest_keys )*
            )?;
            let removed = self.$field.remove(pos);
            Some(removed)
        }
    };
}
