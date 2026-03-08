mod common;
use app_lib::{
    model::defect::{DefectSeverity, DefectStatus},
    service::defect_service::*,
};
use common::MockDatabase;

#[test]
fn test_create() {
    // Arrange
    let mut mock_db = MockDatabase::new();

    // Act
    let result = DefectService::create(
        mock_db.as_db_mut(),
        "id123".into(),
        "id123".into(),
        Some("id123".into()),
        "TODO".into(),
        "TODO".into(),
        DefectSeverity::Minor,
        DefectStatus::Open,
    );

    // Assert
    assert!(result.is_ok());
}

#[test]
fn test_update() {
    // Arrange
    let mut mock_db = MockDatabase::new();

    DefectService::create(
        mock_db.as_db_mut(),
        "id123".into(),
        "id123".into(),
        Some("id123".into()),
        "TODO".into(),
        "TODO".into(),
        DefectSeverity::Minor,
        DefectStatus::Open,
    )
    .unwrap();

    // Act
    let result = DefectService::update(
        mock_db.as_db_mut(),
        "id123".into(),
        Some("TODO".into()),
        Some("TODO".into()),
        Some(DefectSeverity::Minor),
        Some(DefectStatus::Open),
    );

    // Assert
    assert!(result.is_ok());
}

#[test]
fn test_delete() {
    // Arrange
    let mut mock_db = MockDatabase::new();

    DefectService::create(
        mock_db.as_db_mut(),
        "id123".into(),
        "id123".into(),
        Some("id123".into()),
        "TODO".into(),
        "TODO".into(),
        DefectSeverity::Minor,
        DefectStatus::Open,
    )
    .unwrap();

    // Act
    let result = DefectService::delete(mock_db.as_db_mut(), "id123".into());

    // Assert
    assert!(result.is_ok());
}
