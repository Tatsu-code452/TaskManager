use crate::model::project::ProjectStatus;

pub enum FilterExpr<T> {
    And(Vec<FilterExpr<T>>),
    Or(Vec<FilterExpr<T>>),
    Predicate(Box<dyn Fn(&T) -> bool>),
}

pub enum Order {
    Asc,
    Desc,
}

pub enum JoinType {
    Inner,
    Left,
}

pub struct JoinExpr<T, U> {
    pub join_type: JoinType,
    pub on: Box<dyn Fn(&T, &U) -> bool>,
}

pub struct SearchBuilder<T> {
    items: Vec<T>,
    filters: Vec<FilterExpr<T>>,
    #[allow(dead_code)]
    joins: Vec<Box<dyn std::any::Any>>, // 将来 SQL 化のための AST 保持
    order_fns: Vec<Box<dyn Fn(&T, &T) -> std::cmp::Ordering>>,
    limit: Option<usize>,
    offset: Option<usize>,
}

impl<T> SearchBuilder<T>
where
    T: Clone,
{
    pub fn new(items: Vec<T>) -> Self {
        Self {
            items,
            filters: vec![],
            joins: vec![],
            order_fns: vec![],
            limit: None,
            offset: None,
        }
    }

    pub fn select<F>(mut self, f: F) -> Self
    where
        F: Fn() -> Option<Vec<T>>,
    {
        self.items = f().unwrap_or_default();
        self
    }

    pub fn where_filters<F>(mut self, filters: Vec<F>) -> Self
    where
        F: Fn(&T) -> bool + 'static,
    {
        for f in filters {
            self.filters.push(FilterExpr::Predicate(Box::new(f)));
        }
        self
    }

    pub fn and_filter<F>(mut self, f: F) -> Self
    where
        F: Fn(&T) -> bool + 'static,
    {
        self.filters.push(FilterExpr::Predicate(Box::new(f)));
        self
    }

    pub fn or_filters(mut self, filters: Vec<FilterExpr<T>>) -> Self {
        self.filters.push(FilterExpr::Or(filters));
        self
    }

    pub fn order_by<K, F>(mut self, key_fn: F, order: Order) -> Self
    where
        F: Fn(&T) -> K + 'static,
        K: Ord + 'static,
    {
        self.order_fns.push(Box::new(move |a, b| {
            let ka = key_fn(a);
            let kb = key_fn(b);

            match order {
                Order::Asc => ka.cmp(&kb),
                Order::Desc => kb.cmp(&ka),
            }
        }));
        self
    }

    pub fn limit(mut self, limit: usize) -> Self {
        self.limit = Some(limit);
        self
    }

    pub fn offset(mut self, offset: usize) -> Self {
        self.offset = Some(offset);
        self
    }

    fn eval_filter(expr: &FilterExpr<T>, item: &T) -> bool {
        match expr {
            FilterExpr::Predicate(f) => f(item),
            FilterExpr::And(list) => list.iter().all(|e| Self::eval_filter(e, item)),
            FilterExpr::Or(list) => list.iter().any(|e| Self::eval_filter(e, item)),
        }
    }

    pub fn execute(self) -> Vec<T> {
        let mut result: Vec<T> = self
            .items
            .into_iter()
            .filter(|item| self.filters.iter().all(|f| Self::eval_filter(f, item)))
            .collect();

        if !self.order_fns.is_empty() {
            result.sort_by(|a, b| {
                for cmp in &self.order_fns {
                    let ord = cmp(a, b);
                    if ord != std::cmp::Ordering::Equal {
                        return ord;
                    }
                }
                std::cmp::Ordering::Equal
            });
        }

        let offset = self.offset.unwrap_or(0);
        if offset > 0 {
            if offset < result.len() {
                result = result.into_iter().skip(offset).collect();
            } else {
                return vec![];
            }
        }

        if let Some(limit) = self.limit {
            result = result.into_iter().take(limit).collect();
        }

        result
    }
}

pub fn eq_val<T: PartialEq>(value: &T, cond: &T) -> bool {
    value == cond
}

pub fn like_val(value: &str, cond: &str) -> bool {
    value.contains(cond)
}

pub fn between_val<T: PartialOrd>(value: &T, min: &T, max: &T) -> bool {
    value >= min && value <= max
}

pub trait IntoOpt<T> {
    fn into_opt(self) -> Option<T>;
}

// String 系
impl IntoOpt<String> for String {
    fn into_opt(self) -> Option<String> {
        let s = self.trim();
        if s.is_empty() {
            None
        } else {
            Some(s.to_string())
        }
    }
}

impl IntoOpt<String> for &String {
    fn into_opt(self) -> Option<String> {
        let s = self.trim();
        if s.is_empty() {
            None
        } else {
            Some(s.to_string())
        }
    }
}

impl IntoOpt<String> for Option<String> {
    fn into_opt(self) -> Option<String> {
        match self {
            Some(s) if !s.trim().is_empty() => Some(s),
            _ => None,
        }
    }
}

impl IntoOpt<String> for &Option<String> {
    fn into_opt(self) -> Option<String> {
        match self {
            Some(s) if !s.trim().is_empty() => Some(s.clone()),
            _ => None,
        }
    }
}

// ProjectStatus 系
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

impl IntoOpt<ProjectStatus> for Option<ProjectStatus> {
    fn into_opt(self) -> Option<ProjectStatus> {
        self
    }
}

impl IntoOpt<ProjectStatus> for &Option<ProjectStatus> {
    fn into_opt(self) -> Option<ProjectStatus> {
        self.clone()
    }
}
