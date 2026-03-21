/// モデル定義から抽出した情報
pub struct ModelInfo {
    pub model_name: String,
    pub request_name: String,
    pub keys: Vec<FieldInfo>,
    pub fields: Vec<FieldInfo>,
    pub defaults: Vec<DefaultValue>,
    pub enums: Vec<EnumInfo>,
}

/// フィールド情報
pub struct FieldInfo {
    pub name: String,
    pub ty: FieldType,
}

/// 型情報（String, Option, Enum, Vec, etc）
pub enum FieldType {
    String,
    Integer,
    Boolean,
    Enum(String), // enum 名
    Option(Box<FieldType>),
    Vec(Box<FieldType>),
    Custom(String), // その他の型
}

/// デフォルト値
pub struct DefaultValue {
    pub name: String,
    pub value: DefaultKind,
}

/// デフォルト値の種類
pub enum DefaultKind {
    String(String),
    Integer(i64),
    Boolean(bool),
    EnumVariant { enum_name: String, variant: String },
    Null,
    EmptyArray,
}

/// enum の情報
pub struct EnumInfo {
    pub name: String,
    pub variants: Vec<String>,
}
