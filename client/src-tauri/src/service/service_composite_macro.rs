#[macro_export]
macro_rules! define_service_composite {
    (
        $service_name:ident,
        $table_type:ty,
        $request_type:ty,

        $list_fn:ident,
        $create_fn:ident,
        $update_fn:ident,
        $delete_fn:ident,

        $find_all_fn:ident,
        $find_fn:ident,
        $find_mut_fn:ident,
        $add_fn:ident,
        $delete_db_fn:ident,

        $first_key:ident,
        $( $rest_keys:ident ),*
    ) => {
        pub struct $service_name;

        impl $service_name {
            $crate::service_list_by_key!($list_fn, $find_all_fn, $table_type);

            $crate::service_create!(
                $create_fn,
                $table_type,
                $request_type,
                $find_fn,
                $add_fn,
                $first_key,
                $( $rest_keys ),*
            );

            $crate::service_update!(
                $update_fn,
                $table_type,
                $request_type,
                $find_fn,
                $find_mut_fn,
                $first_key,
                $( $rest_keys ),*
            );

            $crate::service_delete!(
                $delete_fn,
                $delete_db_fn,
                $first_key,
                $( $rest_keys ),*
            );
        }
    };
}
