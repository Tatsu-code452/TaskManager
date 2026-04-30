#[macro_export]
macro_rules! service_list {
    ($list_fn:ident, $find_all_fn:ident, $table_type:ty) => {
        pub fn $list_fn(db: &Database, key1_val: String) -> Result<Vec<$table_type>, String> {
            db.$find_all_fn(&key1_val)
                .ok_or_else(|| "Not found".to_string())
        }
    };
}

#[macro_export]
macro_rules! service_list_by_key {
    ($list_fn:ident, $find_all_fn:ident, $table_type:ty) => {
        pub fn $list_fn(db: &Database, key1_val: String) -> Result<Vec<$table_type>, String> {
            if key1_val.trim().is_empty() {
                return Err("Key is empty".into());
            }

            db.$find_all_fn(&key1_val)
                .ok_or_else(|| "Not found".to_string())
        }
    };
}

#[macro_export]
macro_rules! service_create_with_next_id {
    (
        $create_fn:ident,
        $table_type:ty,
        $request_type:ty,
        $find_fn:ident,
        $add_fn:ident,
        $next_id_fn:ident,
        $key1:ident,   // project_id
        $key2:ident    // id
    ) => {
        pub fn $create_fn(
            db: &mut Database,
            payload: $request_type,
        ) -> Result<$table_type, String> {
            if payload.$key1.trim().is_empty() {
                return Err("Key is empty".into());
            }

            // next_id を使う場合、payload.$key2 は無視して採番する
            let new_id = db.$next_id_fn(&payload.$key1);

            // new(id, project_id)
            let mut item = <$table_type>::new(new_id.clone(), payload.$key1.clone());

            item.apply_request(&payload);

            db.$add_fn(item.clone())
                .ok_or_else(|| "Failed to add".to_string())?;

            db.save_atomic()?;
            Ok(item)
        }
    };
}

#[macro_export]
macro_rules! service_create {
    (
        $create_fn:ident,
        $table_type:ty,
        $request_type:ty,
        $find_fn:ident,
        $add_fn:ident,
        $( $keys:ident ),*
    ) => {
        pub fn $create_fn(
            db: &mut Database,
            payload: $request_type,
        ) -> Result<$table_type, String> {

            $(
                if payload.$keys.trim().is_empty() {
                    return Err("Key is empty".into());
                }
            )*

            if db.$find_fn($( &payload.$keys ),*).is_some() {
                return Err("Already exists".into());
            }

            let mut item = <$table_type>::new($( payload.$keys.clone() ),*);

            item.apply_request(&payload);

            db.$add_fn(item.clone())
                .ok_or_else(|| "Failed to add".to_string())?;

            db.save_atomic()?;
            Ok(item)
        }
    };
}

#[macro_export]
macro_rules! service_update {
    (
        $update_fn:ident,
        $table_type:ty,
        $request_type:ty,
        $find_fn:ident,
        $find_mut_fn:ident,
        $( $keys:ident ),*
    ) => {
        pub fn $update_fn(
            db: &mut Database,
            payload: $request_type,
        ) -> Result<$table_type, String> {

            $(
                if payload.$keys.trim().is_empty() {
                    return Err("Key is empty".into());
                }
            )*

            {
                let item = db.$find_mut_fn($( &payload.$keys ),*)
                    .ok_or_else(|| "Not found".to_string())?;

                item.apply_request(&payload);
                item.timestamps.touch();
            }

            db.save_atomic()?;

            Ok(
                db.$find_fn($( &payload.$keys ),*)
                    .unwrap()
                    .clone()
            )
        }
    };
}

#[macro_export]
macro_rules! service_delete {
    (
        $delete_fn:ident,
        $delete_db_fn:ident,
        $( $keys:ident ),*
    ) => {
        pub fn $delete_fn(
            db: &mut Database,
            $( $keys: String ),*
        ) -> Result<(), String> {

            $(
                if $keys.trim().is_empty() {
                    return Err("Key is empty".into());
                }
            )*

            db.$delete_db_fn($( &$keys ),*)
                .ok_or_else(|| "Not found".to_string())?;

            db.save_atomic()?;
            Ok(())
        }
    };
}

#[macro_export]
macro_rules! service_next_id {
    ($next_id_fn:ident, $table:ident, $key1:ident, $key2:ident, $prefix:expr) => {
        pub fn $next_id_fn(db: &Database, key1_val: &str) -> String {
            let mut max_num = 0;

            for item in &db.$table {
                if item.$key1 == key1_val {
                    if let Some(num_str) = item.$key2.strip_prefix($prefix) {
                        if let Ok(num) = num_str.parse::<u32>() {
                            max_num = max_num.max(num);
                        }
                    }
                }
            }

            format!("{}{}", $prefix, max_num + 1)
        }
    };
}
