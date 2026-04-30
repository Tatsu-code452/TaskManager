#[macro_export]
macro_rules! define_command_multiple_id {
    (
        $command_name:ident,
        $service_name:ident,
        $request_type:ty,
        $table_type:ty,

        $list_fn:ident,
        $create_fn:ident,
        $update_fn:ident,
        $delete_fn:ident
    ) => {
        pub struct $command_name;

        impl $command_name {
            pub fn list_impl(db: &Database, key1: String) -> Result<Vec<$table_type>, String> {
                $service_name::$list_fn(db, key1)
            }

            pub fn create_impl(
                db: &mut Database,
                payload: $request_type,
            ) -> Result<$table_type, String> {
                $service_name::$create_fn(db, payload)
            }

            pub fn update_impl(
                db: &mut Database,
                payload: $request_type,
            ) -> Result<$table_type, String> {
                $service_name::$update_fn(db, payload)
            }

            pub fn delete_impl(
                db: &mut Database,
                key1: String,
                key2: String,
            ) -> Result<(), String> {
                $service_name::$delete_fn(db, key1, key2)
            }
        }
    };
}

#[macro_export]
macro_rules! define_tauri_commands_multiple_id {
    (
        $command_name:ident,
        $request_type:ty,
        $table_type:ty,

        $list_fn:ident,
        $create_fn:ident,
        $update_fn:ident,
        $delete_fn:ident
    ) => {
        #[tauri::command]
        pub fn $list_fn(
            state: tauri::State<AppState>,
            project_id: String,
        ) -> Result<Vec<$table_type>, String> {
            let db = state.db.lock().unwrap();
            $command_name::list_impl(&db, project_id)
        }

        #[tauri::command]
        pub fn $create_fn(
            state: tauri::State<AppState>,
            payload: $request_type,
        ) -> Result<$table_type, String> {
            let mut db = state.db.lock().unwrap();
            $command_name::create_impl(&mut db, payload)
        }

        #[tauri::command]
        pub fn $update_fn(
            state: tauri::State<AppState>,
            payload: $request_type,
        ) -> Result<$table_type, String> {
            let mut db = state.db.lock().unwrap();
            $command_name::update_impl(&mut db, payload)
        }

        #[tauri::command]
        pub fn $delete_fn(
            state: tauri::State<AppState>,
            project_id: String,
            id: String,
        ) -> Result<(), String> {
            let mut db = state.db.lock().unwrap();
            $command_name::delete_impl(&mut db, project_id, id)
        }
    };
}
