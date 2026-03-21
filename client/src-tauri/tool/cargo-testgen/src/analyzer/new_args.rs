use std::fs;
use std::path::Path;

use syn::{File, FnArg, ImplItem, Item, Pat};

/// モデルの new() の引数名を Vec<String> で返す
pub fn extract_new_args(sauce_path: &Path, rel: &Path, model_name: &str) -> Vec<String> {
    // ソースコード全体を読み込み,ASTパース
    let path = sauce_path.join(rel);
println!("debugggg:{}", path.display());
    let code = fs::read_to_string(path).expect("failed to read model file");
    let syntax: File = syn::parse_file(&code).expect("failed to parse file");
println!("debugggg:{}", code);

    let mut args = Vec::new();

    // ファイル内のすべての item（構造体、impl、関数など）を走査
    for item in syntax.items {
        //impl ブロックだけを探す
        if let Item::Impl(impl_block) = item {
            // impl Trait for ModelName は無視
            if let Some((_, ty, _)) = &impl_block.trait_ {
                continue;
            }

            // impl が ModelName のものか確認
            if let syn::Type::Path(tp) = &*impl_block.self_ty {
                if tp.path.segments.last().unwrap().ident != model_name {
                    continue;
                }
            } else {
                continue;
            }

            // impl ModelName の中の new() を探す
            for impl_item in impl_block.items {
                if let ImplItem::Fn(method) = impl_item {
                    if method.sig.ident == "new" {
                        // 引数を抽出
                        for input in &method.sig.inputs {
                            if let FnArg::Typed(pat_type) = input {
                                if let Pat::Ident(ident) = &*pat_type.pat {
                                    args.push(ident.ident.to_string());
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // 最初の引数は &self ではないのでそのまま返す
    args
}
