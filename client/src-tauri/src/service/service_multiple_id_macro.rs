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

        $find_by_key1_fn:ident,
        $find_fn:ident,
        $find_mut_fn:ident,
        $add_fn:ident,
        $delete_db_fn:ident,

        $next_id_fn:ident,   // DB 側の next_id
        $key1:ident,
        $key2:ident
    ) => {
        pub struct $service_name;

        impl $service_name {
            $crate::service_list!($list_fn, $find_by_key1_fn, $table_type);

            $crate::service_create_with_next_id!(
                $create_fn,
                $table_type,
                $request_type,
                $find_fn,
                $add_fn,
                $next_id_fn,
                $key1,
                $key2
            );

            $crate::service_update!(
                $update_fn,
                $table_type,
                $request_type,
                $find_fn,
                $find_mut_fn,
                $key1,
                $key2
            );

            $crate::service_delete!($delete_fn, $delete_db_fn, $key1, $key2);
        }
    };
}
