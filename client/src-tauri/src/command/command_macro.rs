#[macro_export]
macro_rules! define_tauri_commands_multiple_id {
    (
        $service:ident,
        $table_type:ty,
        $request_type:ty,

        $list_cmd:ident,
        $create_cmd:ident,
        $update_cmd:ident,
        $delete_cmd:ident
    ) => {
        #[tauri::command]
        pub fn $list_cmd(
            state: tauri::State<AppState>,
            key1_val: String,
        ) -> Result<Vec<$table_type>, String> {
            let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;
            $service::list(&mut db, key1_val)
        }

        #[tauri::command]
        pub fn $create_cmd(
            state: tauri::State<AppState>,
            payload: $request_type,
        ) -> Result<$table_type, String> {
            let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;
            $service::create(&mut db, payload)
        }

        #[tauri::command]
        pub fn $update_cmd(
            state: tauri::State<AppState>,
            payload: $request_type,
        ) -> Result<$table_type, String> {
            let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;
            $service::update(&mut db, payload)
        }

        #[tauri::command]
        pub fn $delete_cmd(
            state: tauri::State<AppState>,
            key2_val: String,
            key1_val: String,
        ) -> Result<(), String> {
            let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;
            $service::delete(&mut db, key2_val, key1_val)
        }
    };
}
