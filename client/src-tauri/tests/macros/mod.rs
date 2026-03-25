#[allow(unused_macros)]
macro_rules! test_helper {
    (
        $builder_name:ident,
        $build_target:ident,
        $result_target:ident,
        {
            $( $key:ident: $key_type:ty => $init_key_value:expr ),* $(,)?
        },
        {
            $( $field:ident: $field_type:ty => $init_field_value:expr ),* $(,)?
        }
    ) => {

        pub struct $builder_name {
            $( $key: $key_type ),*,
            $( $field: Option<$field_type> ),*,
        }

        impl $builder_name {
            pub fn new() -> Self {
                Self {
                    $( $key: $init_key_value ),*,
                    $( $field: None),*,
                }
            }

            $( test_helper!(@setter $key, $key_type);)*
            $( test_helper!(@setterop $field, $field_type);)*

            pub fn build(self) -> $build_target {
                $build_target {
                    $( $key: self.$key ),*,
                    $( $field: self.$field ),*,
                }
            }

            pub fn default_request() -> $build_target {
                $build_target {
                    $( $key: $init_key_value, )*
                    $( $field: $init_field_value, )*
                }
            }            
        }

        pub fn assert_object(object:&$result_target ,expected: &$result_target) {
            $(
                assert_eq!(
                    &object.$key,
                    &expected.$key,
                    "Field `{}` mismatch",
                    stringify!($key)
                );
            )*
            $(
                assert_eq!(
                    &object.$field,
                    &expected.$field,
                    "Field `{}` mismatch",
                    stringify!($field)
                );
            )*
        }

    };

    // --- setter 自動生成ロジック ---
    (@setterop $set_field:ident, $set_field_type:ty) => {
        pub fn $set_field(mut self, v: $set_field_type) -> Self {
            self.$set_field = Some(v);
            self
        }
    };

    (@setter $set_field:ident, $set_field_type:ty) => {
        pub fn $set_field(mut self, v: impl AsRef<str>) -> Self {
            self.$set_field = v.as_ref().to_string();
            self
        }

    };
}