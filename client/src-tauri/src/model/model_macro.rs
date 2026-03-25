#[macro_export]
macro_rules! define_model_all {
    (
        $name:ident,
        $option_name:ident,
        $option_type:ty,
        {
            $( $key:ident : $type:ty ),* $(,)?
        },
        {
            $( $field:ident : $field_type:ty => $init_field_value:expr ),* $(,)?
        }
    ) => {
        crate::define_model!(
            $name,
            $option_name,
            {
                $( $key : $type ),*
            },
            {
                $( $field : $field_type ),*
            }

        );

        crate::define_model_new!(
            $name,
            {
                $( $key : $type ),*
            },
            {
                $( $field => $init_field_value ),*
            }            
        );

        crate::define_apply_request!(
            $name,
            $option_type,
            {
                $( $field ),*
            }
        );
    };
}

#[macro_export]
macro_rules! define_model {
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
            pub timestamps: Timestamps
        }

        #[derive(Deserialize)]
        pub struct $option_name {
            $( pub $key: $type ),*,
            $( pub $field: Option<$field_type> ),*
        }

    };
}

#[macro_export]
macro_rules! define_model_new {
    (
        $name:ident,
        {
            $( $key:ident : $type:ty ),* $(,)?
        },
        {
            $( $field:ident => $init_field_value:expr ),* $(,)?
        }
    ) => {
        impl $name {
            pub fn new ($($key: $type ),*) -> Self {
                Self {
                    $( $key ),*,
                    $( $field: $init_field_value ),*,
                    timestamps: Timestamps::new(),
                }
            }
        }
    };
}

#[macro_export]
macro_rules! define_apply_request {
    (
        $name:ident,
        $option_type:ty,
        {
            $( $field:ident ),* $(,)?
        }
    ) => {
        impl $name {
            pub fn apply_request(&mut self, req: &$option_type) {
                $(
                    if let Some(v) = &req.$field {
                        self.$field = v.clone();
                    }
                )*
            }
        }
    };
}
