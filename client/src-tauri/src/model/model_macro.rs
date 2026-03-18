#[macro_export]
macro_rules! define_model {
    (
        $name:ident,
        $option_name:ident,
        $option_type:ty,
        {
            $( $key:ident : $type:ty ),* $(,)?
        },
        {
            $( $field:ident : $field_type:ty ),* $(,)?
        },
        {
            $( $field_init:ident : $value_init:expr ),* $(,)?
        }
    ) => {
        #[derive(Clone, serde::Deserialize, serde::Serialize)]
        pub struct $name {
            $( pub $key: $type ),*,
            $( pub $field: $field_type ),*,
            pub timestamps: Timestamps
        }

        impl $name {
            pub fn new ($($key: $type ),*) -> Self {
                Self {
                    $( $key ),*,
                    $( $field_init: $value_init ),*,
                    timestamps: Timestamps::new(),
                }
            }

            pub fn apply_request(&mut self, req: &$option_type) {
                $(
                    if let Some(v) = &req.$field {
                        self.$field = v.clone();
                    }
                )*
            }
        }

        #[derive(Deserialize)]
        pub struct $option_name {
            $( pub $key: $type ),*,
            $( pub $field: Option<$field_type> ),*
        }
    };
}
