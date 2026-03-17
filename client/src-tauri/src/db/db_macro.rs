#[macro_export]
macro_rules! define_apply_request {
    (
        $req_type:ty,
        $( $field:ident ),*
    ) => {
            pub fn apply_request(&mut self, req: &$req_type) {
                $(
                    if let Some(v) = &req.$field {
                        self.$field = v.clone();
                    }
                )*
            }
    };
}
