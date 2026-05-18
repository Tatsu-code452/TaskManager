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
