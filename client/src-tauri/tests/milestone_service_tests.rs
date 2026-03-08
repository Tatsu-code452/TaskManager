mod common;
use app_lib::{model::milestone::MilestoneStatus, service::milestone_service::*};
use common::MockDatabase;

#[test]
fn test_create() {
    // Arrange
    let mut mock_db = MockDatabase::new();

    // Act
    let result = MilestoneService::create(
        mock_db.as_db_mut(),
        "id123".into(),
        "id123".into(),
        "test_name".into(),
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

    MilestoneService::create(
        mock_db.as_db_mut(),
        "id123".into(),
        "id123".into(),
        "test_name".into(),
        "2025-01-01".into(),
        "2025-01-01".into(),
    )
    .unwrap();

    // Act
    let result = MilestoneService::update(
        mock_db.as_db_mut(),
        "id123".into(),
        Some("test_name".into()),
        Some("2025-01-01".into()),
        Some("2025-01-01".into()),
        Some("2025-01-01".into()),
        Some("2025-01-01".into()),
        Some(MilestoneStatus::NotStarted),
    );

    // Assert
    assert!(result.is_ok());
}

#[test]
fn test_delete() {
    // Arrange
    let mut mock_db = MockDatabase::new();

    MilestoneService::create(
        mock_db.as_db_mut(),
        "id123".into(),
        "id123".into(),
        "test_name".into(),
        "2025-01-01".into(),
        "2025-01-01".into(),
    )
    .unwrap();

    // Act
    let result = MilestoneService::delete(mock_db.as_db_mut(), "id123".into());

    // Assert
    assert!(result.is_ok());
}
