pub fn default_value<T: DefaultValue>() -> T {
    T::default_value()
}

pub trait DefaultValue {
    fn default_value() -> Self;
}

// String → ""
impl DefaultValue for String {
    fn default_value() -> Self {
        "".to_string()
    }
}

// Option<T> → None
impl<T> DefaultValue for Option<T> {
    fn default_value() -> Self {
        None
    }
}

// i32 → 0
impl DefaultValue for i32 {
    fn default_value() -> Self {
        0
    }
}

// u8 → 0
impl DefaultValue for u8 {
    fn default_value() -> Self {
        0
    }
}

impl DefaultValue for u32 {
    fn default_value() -> Self {
        0
    }
}

impl DefaultValue for f64 {
    fn default_value() -> Self {
        0.0
    }
}

impl<T> DefaultValue for Vec<T> {
    fn default_value() -> Self {
        vec![]
    }
}
