macro_rules! model_with_default {
    (
        $name:ident,
        $option_name:ident,
        {
            $( $key:ident : $type:ty ),* $(,)?
        },
        {
            $( $field:ident : $field_type:ty ),* $(,)?
        }
    ) => {
        #[derive(Clone, serde::Deserialize, serde::Serialize)]
        pub struct $name {
            $( pub $key: $type ),*,
            $( pub $field: $field_type ),*,
            pub timestamps: Timestamps,
        }

        #[derive(serde::Deserialize)]
        pub struct $option_name {
            $( pub $key: $type ),*,
            $( pub $field: Option<$field_type> ),*
        }

        // -----------------------------
        // Default 実装を自動生成
        // -----------------------------
        impl Default for $name {
            fn default() -> Self {
                Self {
                    $(
                        $key: $crate::model::utils::default_value::<$type>(),
                    )*
                    $(
                        $field: $crate::model::utils::default_value::<$field_type>(),
                    )*
                    timestamps: Timestamps::new(),
                }
            }
        }

        impl $name {
            pub fn apply_request(&mut self, req: &$option_name) {
                $(
                    if let Some(v) = &req.$field {
                        self.$field = v.clone();
                    }
                )*
            }
        }

    };
}

pub(crate) use model_with_default;
