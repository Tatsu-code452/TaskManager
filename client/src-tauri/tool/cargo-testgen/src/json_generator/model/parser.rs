use quote::ToTokens;
use syn::{Expr, File, Ident, ItemEnum, Type};

use crate::analyzer::enums::find_enums;
use crate::analyzer::model::{find_define_model_args, DefineModelArgs};
use crate::json_generator::model::structs::{
    DefaultKind, DefaultValue, EnumInfo, FieldInfo, FieldType, ModelInfo,
};

//
// ─────────────────────────────────────────────
//   メインエントリ：ModelInfo を構築
// ─────────────────────────────────────────────
//
pub fn parse_model_info(file: &File) -> ModelInfo {
    // define_model! を探してパース
    let args: DefineModelArgs = find_define_model_args(file);

    // enum 情報を抽出
    let enums: Vec<EnumInfo> = find_enums(file)
        .iter()
        .map(parse_enum_info)
        .collect::<Vec<_>>();

    convert_define_model(args, enums)
}

//
// ─────────────────────────────────────────────
//   DefineModelArgs → ModelInfo 変換
// ─────────────────────────────────────────────
//
pub fn convert_define_model(args: DefineModelArgs, enums: Vec<EnumInfo>) -> ModelInfo {
    ModelInfo {
        model_name: args.model_name.to_string(),
        request_name: args.request_name.to_string(),
        keys: args
            .keys
            .into_iter()
            .map(|f| convert_field(f, &enums))
            .collect(),
        fields: args
            .fields
            .into_iter()
            .map(|f| convert_field(f, &enums))
            .collect(),
        defaults: args.defaults.into_iter().map(convert_default).collect(),
        enums,
    }
}

//
// ─────────────────────────────────────────────
//   フィールド変換
// ─────────────────────────────────────────────
//
fn convert_field((name, ty): (Ident, Type), enums: &Vec<EnumInfo>) -> FieldInfo {
    FieldInfo {
        name: name.to_string(),
        ty: convert_type(ty, enums),
    }
}

//
// ─────────────────────────────────────────────
//   Type → FieldType 変換
// ─────────────────────────────────────────────
//
fn convert_type(ty: Type, enums: &Vec<EnumInfo>) -> FieldType {
    // Path 型以外は Custom 扱い
    let Type::Path(tp) = ty else {
        return FieldType::Custom(ty.to_token_stream().to_string());
    };

    let seg = tp.path.segments.last().unwrap();
    let ident = seg.ident.to_string();

    // Option<T>
    if ident == "Option" {
        if let syn::PathArguments::AngleBracketed(args) = &seg.arguments {
            if let Some(syn::GenericArgument::Type(inner)) = args.args.first() {
                return FieldType::Option(Box::new(convert_type(inner.clone(), enums)));
            }
        }
        return FieldType::Option(Box::new(FieldType::Custom("Unknown".into())));
    }

    // Vec<T>
    if ident == "Vec" {
        if let syn::PathArguments::AngleBracketed(args) = &seg.arguments {
            if let Some(syn::GenericArgument::Type(inner)) = args.args.first() {
                return FieldType::Vec(Box::new(convert_type(inner.clone(), enums)));
            }
        }
        return FieldType::Vec(Box::new(FieldType::Custom("Unknown".into())));
    }

    // プリミティブ
    match ident.as_str() {
        "String" => return FieldType::String,
        "i64" => return FieldType::Integer,
        "bool" => return FieldType::Boolean,
        _ => {}
    }

    // Enum 判定
    if enums.iter().any(|e| e.name == ident) {
        return FieldType::Enum(ident);
    }

    // Custom 型
    FieldType::Custom(ident)
}

//
// ─────────────────────────────────────────────
//   DefaultValue 変換
// ─────────────────────────────────────────────
//
fn convert_default((name, expr): (Ident, Expr)) -> DefaultValue {
    DefaultValue {
        name: name.to_string(),
        value: convert_default_expr(expr),
    }
}

//
// ─────────────────────────────────────────────
//   Expr → DefaultKind 変換
// ─────────────────────────────────────────────
//
fn convert_default_expr(expr: Expr) -> DefaultKind {
    match expr {
        // ────────────────────────────────
        // リテラル: "text", 0, true
        // ────────────────────────────────
        Expr::Lit(lit) => match lit.lit {
            syn::Lit::Str(s) => DefaultKind::String(s.value()),
            syn::Lit::Int(i) => DefaultKind::Integer(i.base10_parse().unwrap()),
            syn::Lit::Bool(b) => DefaultKind::Boolean(b.value),
            other => panic!("Unsupported literal default"),
        },

        // ────────────────────────────────
        // "text".into()
        // ────────────────────────────────
        Expr::MethodCall(ref mc) if mc.method == "into" => {
            if let Expr::Lit(lit) = *mc.receiver.clone() {
                if let syn::Lit::Str(s) = lit.lit {
                    return DefaultKind::String(s.value());
                }
            }
            panic!("Unsupported .into() default: {}", mc.to_token_stream());
        }

        // ────────────────────────────────
        // None
        // ────────────────────────────────
        Expr::Path(p) if p.path.is_ident("None") => DefaultKind::Null,

        // ────────────────────────────────
        // Enum variant: Foo::Bar
        // ────────────────────────────────
        Expr::Path(p) => {
            let segs = &p.path.segments;

            if segs.len() == 2 {
                let enum_name = segs[0].ident.to_string();
                let variant = segs[1].ident.to_string();
                return DefaultKind::EnumVariant { enum_name, variant };
            }

            panic!("Unsupported default path: {}", p.to_token_stream());
        }

        // ────────────────────────────────
        // 空配列: []
        // ────────────────────────────────
        Expr::Array(arr) => {
            if arr.elems.is_empty() {
                return DefaultKind::EmptyArray;
            }
            panic!(
                "Non-empty array defaults are not supported: {}",
                arr.to_token_stream()
            );
        }

        // ────────────────────────────────
        // vec![] マクロ
        // ────────────────────────────────
        Expr::Macro(mac) => {
            let tokens = mac.mac.tokens.to_string().replace(' ', "");
            if tokens == "" {
                return DefaultKind::EmptyArray;
            }
            panic!("Unsupported macro default: {}", mac.to_token_stream());
        }

        // ────────────────────────────────
        // fallback
        // ────────────────────────────────
        other => panic!(
            "Unsupported default expression: {}",
            other.to_token_stream()
        ),
    }
}

//
// ─────────────────────────────────────────────
//   EnumInfo 抽出
// ─────────────────────────────────────────────
//
pub fn parse_enum_info(en: &ItemEnum) -> EnumInfo {
    let name = en.ident.to_string();
    let variants = en.variants.iter().map(|v| v.ident.to_string()).collect();

    EnumInfo { name, variants }
}
