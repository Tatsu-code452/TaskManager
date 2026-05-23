use crate::{
    db::database::Database,
    domain::project::model::{Project, ProjectRequest, ProjectSearchCondition, ProjectStatus},
    service::search_utils::{eq_val, like_val, IntoOpt, Order, SearchBuilder},
};

impl IntoOpt<ProjectStatus> for ProjectStatus {
    fn into_opt(self) -> Option<ProjectStatus> {
        Some(self)
    }
}

impl IntoOpt<ProjectStatus> for &ProjectStatus {
    fn into_opt(self) -> Option<ProjectStatus> {
        Some(self.clone())
    }
}

pub struct ProjectService;

#[derive(serde::Serialize)]
pub struct ProjectSearchResult {
    pub items: Vec<Project>,
    pub total_num: usize,
}

impl ProjectService {
    pub fn list(db: &Database) -> Result<Vec<Project>, String> {
        Ok(db.find_all_project())
    }

    pub fn create(db: &mut Database, payload: ProjectRequest) -> Result<Project, String> {
        if payload.id.trim().is_empty() {
            return Err("Key is empty".into());
        }

        if db.find_project(&payload.id).is_some() {
            return Err("Already exists".into());
        }

        let mut item = Project::default();
        item.id = payload.id.clone();
        item.apply_request(&payload);

        db.add_project(item.clone())
            .ok_or_else(|| "Failed to add".to_string())?;

        db.save_atomic()?;
        Ok(item)
    }

    pub fn update(db: &mut Database, payload: ProjectRequest) -> Result<Project, String> {
        {
            if payload.id.trim().is_empty() {
                return Err("Key is empty".into());
            }

            let item = db
                .find_project_mut(&payload.id)
                .ok_or_else(|| "Not found".to_string())?;
            item.apply_request(&payload);
            item.timestamps.touch();
        }

        db.save_atomic()?;

        Ok(db.find_project(&payload.id).unwrap().clone())
    }

    pub fn delete(db: &mut Database, id: String) -> Result<(), String> {
        if id.trim().is_empty() {
            return Err("Key is empty".into());
        }

        db.delete_project_with_relation(&id)
            .ok_or_else(|| "Not found".to_string())?;

        db.save_atomic()?;
        Ok(())
    }

    pub fn search(
        db: &Database,
        condition: ProjectSearchCondition,
    ) -> Result<ProjectSearchResult, String> {
        // --- ページング安全化 ---
        let page = condition.page.unwrap_or(1).max(1);
        let limit = condition.limit.unwrap_or(20).clamp(1, 200);
        let offset = (page - 1) * limit;

        // 条件検索
        let filtered = SearchBuilder::new(vec![])
            .select(|| db.find_all_project())
            .where_filters(apply_project_filters(&condition))
            .order_by(|p| p.id.clone(), Order::Asc)
            .execute();

        // 条件一致全データ件数を保持
        let total_num = filtered.len();

        // ページネーション適用
        let items = if offset >= total_num {
            vec![]
        } else {
            filtered
                .into_iter()
                .skip(offset)
                .take(limit)
                .collect::<Vec<_>>()
        };

        Ok(ProjectSearchResult { items, total_num })
    }
}

// 絞り込み条件動的生成
fn push_filter_opt<T, F>(opt: &Option<T>, filters: &mut Vec<Box<dyn Fn(&Project) -> bool>>, func: F)
where
    T: Clone + 'static,
    F: Fn(&Project, &T) -> bool + 'static,
{
    if let Some(value) = opt.clone().into_opt() {
        filters.push(Box::new(move |p| func(p, &value)));
    }
}

pub fn apply_project_filters(cond: &ProjectSearchCondition) -> Vec<Box<dyn Fn(&Project) -> bool>> {
    let mut filters: Vec<Box<dyn Fn(&Project) -> bool>> = vec![];

    push_filter_opt(&cond.name, &mut filters, |p, name| like_val(&p.name, name));

    push_filter_opt(&cond.client, &mut filters, |p, client| {
        like_val(&p.client, client)
    });

    push_filter_opt(&cond.description, &mut filters, |p, desc| {
        like_val(&p.description, desc)
    });

    if let Some(status) = cond.status.clone() {
        if status != ProjectStatus::All {
            push_filter_opt(&Some(status), &mut filters, |p, st| eq_val(&p.status, st));
        }
    }

    push_filter_opt(&cond.owner, &mut filters, |p, owner| {
        like_val(&p.owner, owner)
    });

    push_filter_opt(&cond.start_date, &mut filters, |p, start| {
        match &p.start_date {
            Some(p_start) => p_start >= start,
            None => true,
        }
    });

    push_filter_opt(&cond.end_date, &mut filters, |p, end| match &p.end_date {
        Some(p_end) => p_end <= end,
        None => true,
    });

    filters
}
