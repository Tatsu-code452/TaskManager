use syn::{File, Item, ItemEnum};

pub fn find_enums(file: &File) -> Vec<ItemEnum> {
    let mut enums = vec![];

    for item in &file.items {
        if let Item::Enum(en) = item {
            enums.push(en.clone());
        }
    }

    enums
}
