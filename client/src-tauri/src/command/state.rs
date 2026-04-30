use crate::db::database::Database;
use std::sync::Mutex;

pub struct AppState {
    pub db: Mutex<Database>,
}

impl AppState {
    pub fn new() -> Self {
        let db = Database::load().unwrap_or_else(|_| Database::empty());
        Self { db: Mutex::new(db) }
    }
}
