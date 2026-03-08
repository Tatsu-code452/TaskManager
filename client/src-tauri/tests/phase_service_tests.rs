mod common;
use app_lib::service::phase_service::*;
use common::MockDatabase;

#[test]
fn test_create() {
    // Arrange
    let mut mock_db = MockDatabase::new();

    // Act
    let result = PhaseService::create(
        mock_db.as_db_mut(),
        "id123".into(),
        "id123".into(),
        "test_name".into(),
        1,
        vec![],
        vec![],
    );

    // Assert
    assert!(result.is_ok());
}

#[test]
fn test_update() {
    // Arrange
    let mut mock_db = MockDatabase::new();

    PhaseService::create(
        mock_db.as_db_mut(),
        "id123".into(),
        "id123".into(),
        "test_name".into(),
        1,
        vec![],
        vec![],
    )
    .unwrap();

    // Act
    let result = PhaseService::update(
        mock_db.as_db_mut(),
        "id123".into(),
        Some("id123".into()),
        Some("test_name".into()),
        Some(1),
        Some(vec![]),
        Some(vec![]),
    );

    // Assert
    assert!(result.is_ok());
}

#[test]
fn test_delete() {
    // Arrange
    let mut mock_db = MockDatabase::new();

    PhaseService::create(
        mock_db.as_db_mut(),
        "id123".into(),
        "id123".into(),
        "test_name".into(),
        1,
        vec![],
        vec![],
    )
    .unwrap();

    // Act
    let result = PhaseService::delete(mock_db.as_db_mut(), "id123".into());

    // Assert
    assert!(result.is_ok());
}
