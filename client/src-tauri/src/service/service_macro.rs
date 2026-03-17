#[macro_export]
macro_rules! define_service_multiple_id {
    (
        $service_name:ident,
        $table_type:ty,
        $request_type:ty,

        $list_fn:ident,
        $create_fn:ident,
        $update_fn:ident,
        $delete_fn:ident,

        $find_by_project_fn:ident,
        $find_fn:ident,
        $find_mut_fn:ident,
        $add_fn:ident,
        $delete_db_fn:ident,

        $key1:ident,   // project_id
        $key2:ident    // id
    ) => {
        pub struct $service_name;

        impl $service_name {
            pub fn $list_fn(
                db: &mut Database,
                key1_val: String,
            ) -> Result<Vec<$table_type>, String> {
                Ok(db.$find_by_project_fn(&key1_val))
            }

            pub fn $create_fn(
                db: &mut Database,
                payload: $request_type,
            ) -> Result<$table_type, String> {
                if db.$find_fn(&payload.$key1, &payload.$key2).is_some() {
                    return Err("Already exists".into());
                }

                let mut item = <$table_type>::new(payload.$key2.clone(), payload.$key1.clone());
                item.apply_request(&payload);

                db.$add_fn(item.clone());
                db.save_atomic()?;

                Ok(item)
            }

            pub fn $update_fn(
                db: &mut Database,
                payload: $request_type,
            ) -> Result<$table_type, String> {
                {
                    let item = db
                        .$find_mut_fn(&payload.$key1, &payload.$key2)
                        .ok_or_else(|| "Not found".to_string())?;

                    item.apply_request(&payload);
                    item.timestamps.touch();
                }

                db.save_atomic()?;

                Ok(db.$find_fn(&payload.$key1, &payload.$key2).unwrap().clone())
            }

            pub fn $delete_fn(
                db: &mut Database,
                key2_val: String,
                key1_val: String,
            ) -> Result<(), String> {
                db.$delete_db_fn(&key1_val, &key2_val)
                    .ok_or_else(|| "Not found".to_string())?;

                db.save_atomic()?;
                Ok(())
            }
        }
    };
}
