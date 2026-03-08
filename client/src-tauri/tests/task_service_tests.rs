mod common;
use app_lib::{model::task::{Task, TaskStatus}, service::task_service::*};
use common::MockDatabase;

#[test]
fn test_create() {
    // Arrange
    let mut mock_db = MockDatabase::new();

    // Act
    let result = TaskService::create(
        mock_db.as_db_mut(),
        "id123".into(),
        "id123".into(),
        "test_name".into(),
        "TODO".into(),
        "TODO".into(),
        Some("TODO".into()),
        Some("TODO".into()),
        0.0,
        0.0,
        0.0,
        TaskStatus::NotStarted,
    );

    // Assert
    assert!(result.is_ok());
}

#[test]
fn test_update() {
    // Arrange
    let mut mock_db = MockDatabase::new();

    TaskService::create(
        mock_db.as_db_mut(),
        "id123".into(),
        "id123".into(),
        "test_name".into(),
        "TODO".into(),
        "TODO".into(),
        Some("TODO".into()),
        Some("TODO".into()),
        0.0,
        0.0,
        0.0,
        TaskStatus::NotStarted,
    )
    .unwrap();

    let task: Option<&Task> = mock_db.as_db_mut().tasks.get(0);

    let id = task.map(|t| t.id.clone()).unwrap();

    // Act
    let result = TaskService::update(
        mock_db.as_db_mut(),
        id,
        Some("id123".into()),
        Some("id123".into()),
        Some("test_name".into()),
        Some("TODO".into()),
        Some("TODO".into()),
        Some("TODO".into()),
        Some("TODO".into()),
        Some(0.0),
        Some(0.0),
        Some(0.0),
        Some(TaskStatus::NotStarted),
    );

    // Assert
    assert!(result.is_ok());
}

#[test]
fn test_delete() {
    // Arrange
    let mut mock_db = MockDatabase::new();

    TaskService::create(
        mock_db.as_db_mut(),
        "id123".into(),
        "id123".into(),
        "test_name".into(),
        "TODO".into(),
        "TODO".into(),
        Some("TODO".into()),
        Some("TODO".into()),
        0.0,
        0.0,
        0.0,
        TaskStatus::NotStarted,
    )
    .unwrap();

    // Act
    let result = TaskService::delete(mock_db.as_db_mut(), "id123".into());

    // Assert
    assert!(result.is_ok());
}
