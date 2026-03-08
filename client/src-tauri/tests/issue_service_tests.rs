mod common;
use app_lib::{
    model::issue::{IssuePriority, IssueStatus},
    service::issue_service::*,
};
use common::MockDatabase;

#[test]
fn test_create() {
    // Arrange
    let mut mock_db = MockDatabase::new();

    // Act
    let result = IssueService::create(
        mock_db.as_db_mut(),
        "id123".into(),
        "id123".into(),
        Some("id123".into()),
        "TODO".into(),
        "TODO".into(),
        IssueStatus::Open,
        IssuePriority::Low,
        "TODO".into(),
    );

    // Assert
    assert!(result.is_ok());
}

#[test]
fn test_update() {
    // Arrange
    let mut mock_db = MockDatabase::new();

    IssueService::create(
        mock_db.as_db_mut(),
        "id123".into(),
        "id123".into(),
        Some("id123".into()),
        "TODO".into(),
        "TODO".into(),
        IssueStatus::Open,
        IssuePriority::Low,
        "TODO".into(),
    )
    .unwrap();

    // Act
    let result = IssueService::update(
        mock_db.as_db_mut(),
        "id123".into(),
        Some("TODO".into()),
        Some("TODO".into()),
        Some(IssueStatus::Open),
        Some(IssuePriority::Low),
        Some("TODO".into()),
    );

    // Assert
    assert!(result.is_ok());
}

#[test]
fn test_delete() {
    // Arrange
    let mut mock_db = MockDatabase::new();

    IssueService::create(
        mock_db.as_db_mut(),
        "id123".into(),
        "id123".into(),
        Some("id123".into()),
        "TODO".into(),
        "TODO".into(),
        IssueStatus::Open,
        IssuePriority::Low,
        "TODO".into(),
    )
    .unwrap();

    // Act
    let result = IssueService::delete(mock_db.as_db_mut(), "id123".into());

    // Assert
    assert!(result.is_ok());
}
