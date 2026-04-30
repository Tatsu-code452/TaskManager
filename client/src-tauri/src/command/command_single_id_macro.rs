#[macro_export]
macro_rules! define_command_single_id_impl {
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
            pub fn list_impl(db: &Database) -> Result<Vec<$table_type>, String> {
                $service_name::$list_fn(db)
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

            pub fn delete_impl(db: &mut Database, id: String) -> Result<(), String> {
                $service_name::$delete_fn(db, id)
            }
        }
    };
}

#[macro_export]
macro_rules! define_tauri_commands_single_id {
    (
        $command_name:ident,
        $request_type:ty,
        $table_type:ty,

        // Tauri 側の公開関数名
        $list_cmd:ident,
        $create_cmd:ident,
        $update_cmd:ident,
        $delete_cmd:ident
    ) => {
        #[tauri::command]
        pub fn $list_cmd(state: tauri::State<AppState>) -> Result<Vec<$table_type>, String> {
            let db = state.db.lock().unwrap();
            $command_name::list_impl(&db)
        }

        #[tauri::command]
        pub fn $create_cmd(
            state: tauri::State<AppState>,
            payload: $request_type,
        ) -> Result<$table_type, String> {
            let mut db = state.db.lock().unwrap();
            $command_name::create_impl(&mut db, payload)
        }

        #[tauri::command]
        pub fn $update_cmd(
            state: tauri::State<AppState>,
            payload: $request_type,
        ) -> Result<$table_type, String> {
            let mut db = state.db.lock().unwrap();
            $command_name::update_impl(&mut db, payload)
        }

        #[tauri::command]
        pub fn $delete_cmd(state: tauri::State<AppState>, id: String) -> Result<(), String> {
            let mut db = state.db.lock().unwrap();
            $command_name::delete_impl(&mut db, id)
        }
    };
}
