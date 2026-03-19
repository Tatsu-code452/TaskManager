#[macro_export]
macro_rules! define_service_single_id {
    (
        $service_name:ident,
        $table_type:ty,
        $request_type:ty,

        $list_fn:ident,
        $create_fn:ident,
        $update_fn:ident,
        $delete_fn:ident,

        $find_fn:ident,
        $find_mut_fn:ident,
        $find_all_fn:ident,
        $add_fn:ident,
        $delete_db_fn:ident,

        $key:ident
    ) => {
        pub struct $service_name;

        impl $service_name {
            $crate::service_list_single!($list_fn, $find_all_fn, $table_type);

            $crate::service_create_single!(
                $create_fn,
                $table_type,
                $request_type,
                $find_fn,
                $add_fn,
                $key
            );

            $crate::service_update_single!(
                $update_fn,
                $table_type,
                $request_type,
                $find_fn,
                $find_mut_fn,
                $key
            );

            $crate::service_delete_single!($delete_fn, $delete_db_fn, $key);
        }
    };
}

#[macro_export]
macro_rules! service_list_single {
    ($list_fn:ident, $find_all_fn:ident, $table_type:ty) => {
        pub fn $list_fn(db: &Database) -> Result<Vec<$table_type>, String> {
            db.$find_all_fn().ok_or_else(|| "Not found".to_string())
        }
    };
}

#[macro_export]
macro_rules! service_create_single {
    (
        $create_fn:ident,
        $table_type:ty,
        $request_type:ty,
        $find_fn:ident,
        $add_fn:ident,
        $key:ident
    ) => {
        pub fn $create_fn(
            db: &mut Database,
            payload: $request_type,
        ) -> Result<$table_type, String> {
            if db.$find_fn(&payload.$key).is_some() {
                return Err("Already exists".into());
            }

            let mut item = <$table_type>::new(payload.$key.clone());
            item.apply_request(&payload);

            db.$add_fn(item.clone())
                .ok_or_else(|| "Failed to add".to_string())?;

            db.save_atomic()?;
            Ok(item)
        }
    };
}

#[macro_export]
macro_rules! service_update_single {
    (
        $update_fn:ident,
        $table_type:ty,
        $request_type:ty,
        $find_fn:ident,
        $find_mut_fn:ident,
        $key:ident
    ) => {
        pub fn $update_fn(
            db: &mut Database,
            payload: $request_type,
        ) -> Result<$table_type, String> {
            {
                let item = db
                    .$find_mut_fn(&payload.$key)
                    .ok_or_else(|| "Not found".to_string())?;

                item.apply_request(&payload);
                item.timestamps.touch();
            }

            db.save_atomic()?;

            Ok(db.$find_fn(&payload.$key).unwrap().clone())
        }
    };
}

#[macro_export]
macro_rules! service_delete_single {
    (
        $delete_fn:ident,
        $delete_db_fn:ident,
        $key:ident
    ) => {
        pub fn $delete_fn(db: &mut Database, $key: String) -> Result<(), String> {
            db.$delete_db_fn(&$key)
                .ok_or_else(|| "Not found".to_string())?;

            db.save_atomic()?;
            Ok(())
        }
    };
}
