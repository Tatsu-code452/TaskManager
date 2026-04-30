use crate::db::database::Database;
use crate::define_service_single_id;
use crate::model::project::{Project, ProjectRequest, ProjectSearchCondition, ProjectStatus};
use crate::service::search_utils::{eq_val, like_val, IntoOpt, Order, SearchBuilder};

define_service_single_id!(
    ProjectService,
    Project,
    ProjectRequest,
    list,
    create,
    update,
    delete,
    find_project,
    find_project_mut,
    find_all_project,
    add_project,
    update_project,
    delete_project,
    id
);

#[derive(serde::Serialize)]
pub struct ProjectSearchResult {
    pub items: Vec<Project>,
    pub total_num: usize,
}

impl ProjectService {
    pub fn search(
        db: &Database,
        condition: ProjectSearchCondition,
    ) -> Result<ProjectSearchResult, String> {
        let page = condition.page.unwrap_or(1);
        let limit = condition.limit.unwrap_or(20);
        let offset = (page - 1) * limit;

        let filtered = SearchBuilder::new(vec![])
            .select(|| db.find_all_project())
            .where_filters(apply_project_filters(&condition))
            .order_by(|p| p.id.clone(), Order::Asc)
            .execute();

        let total_num = filtered.len();

        // --- ページネーション適用 ---
        let items = filtered
            .into_iter()
            .skip(offset)
            .take(limit)
            .collect::<Vec<_>>();

        Ok(ProjectSearchResult { items, total_num })
    }
}

pub fn apply_project_filters(cond: &ProjectSearchCondition) -> Vec<Box<dyn Fn(&Project) -> bool>> {
    let mut filters: Vec<Box<dyn Fn(&Project) -> bool>> = vec![];

    if let Some(name) = cond.name.clone().into_opt() {
        filters.push(Box::new(move |p| like_val(&p.name, &name)));
    }

    if let Some(client) = cond.client.clone().into_opt() {
        filters.push(Box::new(move |p| like_val(&p.client, &client)));
    }

    if let Some(desc) = cond.description.clone().into_opt() {
        filters.push(Box::new(move |p| like_val(&p.description, &desc)));
    }

    if let Some(status) = cond.status.clone() {
        if status != ProjectStatus::All {
            filters.push(Box::new(move |p| eq_val(&p.status, &status)));
        }
    }

    if let Some(owner) = cond.owner.clone().into_opt() {
        filters.push(Box::new(move |p| like_val(&p.owner, &owner)));
    }

    if let Some(start) = cond.start_date.clone().into_opt() {
        filters.push(Box::new(move |p| {
            if let Some(p_start) = p.start_date.clone() {
                return p_start >= start;
            }
            true
        }));
    }

    if let Some(end) = cond.end_date.clone().into_opt() {
        filters.push(Box::new(move |p| {
            if let Some(p_end) = p.end_date.clone() {
                return p_end <= end;
            }
            true
        }));
    }

    filters
}
