mod common;
use app_lib::service::task_actual_cell_service::*;
use common::MockDatabase;

#[test]
fn test_create() {
    // Arrange
    let mut mock_db = MockDatabase::new();

    // Act
    let result = TaskActualCellService::create(
        mock_db.as_db_mut(),
        "id123".into(),
        "2025-01-01".into(),
        0.0,
    );

    // Assert
    assert!(result.is_ok());
}

#[test]
fn test_read_all() {
    // Arrange
    let mut mock_db = MockDatabase::new();

    // Act
    let result = TaskActualCellService::read_all(mock_db.as_db_mut(), "id123".into());

    // Assert
    assert!(result.is_empty());
}

#[test]
fn test_update() {
    // Arrange
    let mut mock_db = MockDatabase::new();

    TaskActualCellService::create(
        mock_db.as_db_mut(),
        "id123".into(),
        "2025-01-01".into(),
        0.0,
    ).unwrap();

    // Act
    let result = TaskActualCellService::update(
        mock_db.as_db_mut(),
        "id123".into(),
        "2025-01-01".into(),
        Some(0.0),
    );

    // Assert
    assert!(result.is_ok());
}

#[test]
fn test_delete() {
    // Arrange
    let mut mock_db = MockDatabase::new();

    TaskActualCellService::create(
        mock_db.as_db_mut(),
        "id123".into(),
        "2025-01-01".into(),
        0.0,
    ).unwrap();

    // Act
    let result =
        TaskActualCellService::delete(mock_db.as_db_mut(), "id123".into(), "2025-01-01".into());

    // Assert
    assert!(result.is_ok());
}
