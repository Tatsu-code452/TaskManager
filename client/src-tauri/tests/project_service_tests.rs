mod common;
use app_lib::{model::project::ProjectStatus, service::project_service::*};
use common::MockDatabase;

#[test]
fn test_create() {
    // Arrange
    let mut mock_db = MockDatabase::new();

    // Act
    let result = ProjectService::create(
        mock_db.as_db_mut(),
        "id123".into(),
        "test_name".into(),
        "TODO".into(),
        ProjectStatus::Planned,
        "2025-01-01".into(),
        "2025-01-01".into(),
    );

    // Assert
    assert!(result.is_ok());
}

#[test]
fn test_update() {
    // Arrange
    let mut mock_db = MockDatabase::new();

    ProjectService::create(
        mock_db.as_db_mut(),
        "id123".into(),
        "test_name".into(),
        "TODO".into(),
        ProjectStatus::Planned,
        "2025-01-01".into(),
        "2025-01-01".into(),
    )
    .unwrap();

    // Act
    let result = ProjectService::update(
        mock_db.as_db_mut(),
        "id123".into(),
        Some("test_name".into()),
        Some("TODO".into()),
        Some(ProjectStatus::Planned),
        Some("2025-01-01".into()),
        Some("2025-01-01".into()),
    );

    // Assert
    assert!(result.is_ok());
}

#[test]
fn test_delete() {
    // Arrange
    let mut mock_db = MockDatabase::new();

    ProjectService::create(
        mock_db.as_db_mut(),
        "id123".into(),
        "test_name".into(),
        "TODO".into(),
        ProjectStatus::Planned,
        "2025-01-01".into(),
        "2025-01-01".into(),
    )
    .unwrap();

    // Act
    let result = ProjectService::delete(mock_db.as_db_mut(), "id123".into());

    // Assert
    assert!(result.is_ok());
}
