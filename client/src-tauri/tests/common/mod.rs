use app_lib::db::database::Database;

#[derive(Default)]
pub struct MockDatabase {
    pub save_called: bool,
    pub find_called: bool,
    pub delete_called: bool,
    inner: Database,
}

impl MockDatabase {
    pub fn new() -> Self {
        Self {
            save_called: false,
            find_called: false,
            delete_called: false,
            inner: Database::empty(),
        }
    }

    // --- Expectation API ---
    pub fn expect_save(&mut self) {
        self.save_called = true;
    }

    pub fn expect_find(&mut self) {
        self.find_called = true;
    }

    pub fn expect_delete(&mut self) {
        self.delete_called = true;
    }

    // --- DB access ---
    pub fn as_db_mut(&mut self) -> &mut Database {
        &mut self.inner
    }
}
