#[macro_export]
macro_rules! define_command_composite_impl {
    (
        $command_name:ident,
        $service_name:ident,
        $request_type:ty,
        $table_type:ty,

        $list_fn:ident,
        $create_fn:ident,
        $update_fn:ident,
        $delete_fn:ident,
        $key1: ident,
        $key2: ident
    ) => {
        pub struct $command_name;

        impl $command_name {
            pub fn list_impl(db: &Database, $key1: String) -> Result<Vec<$table_type>, String> {
                $service_name::$list_fn(db, $key1)
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
                $key1: String,
                $key2: String,
            ) -> Result<(), String> {
                $service_name::$delete_fn(db, $key1, $key2)
            }
        }
    };
}

#[macro_export]
macro_rules! define_tauri_commands_composite {
    (
        $command_name:ident,
        $request_type:ty,
        $table_type:ty,

        // Tauri 側の公開関数名（ユニークにする）
        $list_cmd:ident,
        $create_cmd:ident,
        $update_cmd:ident,
        $delete_cmd:ident,

        $key1: ident,
        $key2: ident
    ) => {
        #[tauri::command]
        pub fn $list_cmd(
            state: tauri::State<AppState>,
            $key1: String,
        ) -> Result<Vec<$table_type>, String> {
            println!("task_id received = {}", $key1);
            let db = state.db.lock().unwrap();
            $command_name::list_impl(&db, $key1)
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
        pub fn $delete_cmd(
            state: tauri::State<AppState>,
            $key1: String,
            $key2: String,
        ) -> Result<(), String> {
            let mut db = state.db.lock().unwrap();
            $command_name::delete_impl(&mut db, $key1, $key2)
        }
    };
}
