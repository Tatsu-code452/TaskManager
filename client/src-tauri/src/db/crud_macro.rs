#[macro_export]
macro_rules! define_crud {
    (
        $add_fn:ident,
        $find_fn:ident,
        $find_mut_fn:ident,
        $delete_fn:ident,
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

            pub fn $delete_fn(&mut self, id: &str) {
                if let Some(idx) = self.$index.remove(id) {
                    self.$field.remove(idx);
                    self.rebuild_indexes();
                }
            }
        }
    };
}
