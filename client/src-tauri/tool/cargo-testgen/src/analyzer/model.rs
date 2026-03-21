use syn::parse::{Parse, ParseStream};
use syn::{braced, File};
use syn::{token::Comma, Expr, Ident, Type};

pub fn find_define_model_args(file: &File) -> DefineModelArgs {
    let args = file
        .items
        .iter()
        .filter_map(|item| {
            if let syn::Item::Macro(mac) = item {
                if mac.mac.path.segments.last().unwrap().ident == "define_model" {
                    let parsed: DefineModelArgs = syn::parse2(mac.mac.tokens.clone())
                        .expect("Failed to parse define_model! arguments");
                    return Some(parsed);
                }
            }
            None
        })
        .next()
        .expect("define_model! not found");

    args
}

//
// ─────────────────────────────────────────────
//   define_model! の引数パース
// ─────────────────────────────────────────────
//
pub struct DefineModelArgs {
    pub model_name: Ident,
    pub request_name: Ident,
    pub request_type: Ident,
    pub keys: Vec<(Ident, Type)>,
    pub fields: Vec<(Ident, Type)>,
    pub defaults: Vec<(Ident, Expr)>,
}

impl Parse for DefineModelArgs {
    fn parse(input: ParseStream) -> syn::Result<Self> {
        let model_name: Ident = input.parse()?;
        input.parse::<Comma>()?;

        let request_name: Ident = input.parse()?;
        input.parse::<Comma>()?;

        let request_type: Ident = input.parse()?;
        input.parse::<Comma>()?;

        let keys = parse_field_block(input)?;
        input.parse::<Comma>()?;

        let fields = parse_field_block(input)?;
        input.parse::<Comma>()?;

        let defaults = parse_default_block(input)?;

        Ok(Self {
            model_name,
            request_name,
            request_type,
            keys,
            fields,
            defaults,
        })
    }
}

//
// ─────────────────────────────────────────────
//   { name: Type, ... } のパース
// ─────────────────────────────────────────────
//
fn parse_field_block(input: ParseStream) -> syn::Result<Vec<(Ident, Type)>> {
    let content;
    braced!(content in input);

    let mut fields = vec![];

    while !content.is_empty() {
        let name: Ident = content.parse()?;
        content.parse::<syn::Token![:]>()?;
        let ty: Type = content.parse()?;

        fields.push((name, ty));

        if content.peek(Comma) {
            content.parse::<Comma>()?;
        }
    }

    Ok(fields)
}

//
// ─────────────────────────────────────────────
//   { name: expr, ... } のパース
// ─────────────────────────────────────────────
//
fn parse_default_block(input: ParseStream) -> syn::Result<Vec<(Ident, Expr)>> {
    let content;
    braced!(content in input);

    let mut defaults = vec![];

    while !content.is_empty() {
        let name: Ident = content.parse()?;
        content.parse::<syn::Token![:]>()?;
        let expr: Expr = content.parse()?;

        defaults.push((name, expr));

        if content.peek(Comma) {
            content.parse::<Comma>()?;
        }
    }

    Ok(defaults)
}
