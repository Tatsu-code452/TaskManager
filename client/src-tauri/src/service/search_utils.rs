use crate::model::project::ProjectStatus;

pub struct SearchBuilder<T> {
    items: Vec<T>,
    filters: Vec<FilterExpr<T>>,
    order_fns: Vec<Box<dyn Fn(&T, &T) -> std::cmp::Ordering>>,
    limit: Option<usize>,
    offset: Option<usize>,
}

impl<T> SearchBuilder<T>
where
    T: Clone,
{
    // ビルダー初期化
    pub fn new(items: Vec<T>) -> Self {
        Self {
            items,
            filters: vec![],
            order_fns: vec![],
            limit: None,
            offset: None,
        }
    }

    // データ保持
    pub fn select<F>(mut self, function: F) -> Self
    where
        F: Fn() -> Vec<T>,
    {
        self.items = function();
        self
    }

    // データ絞り込み
    pub fn where_filters<F>(mut self, filters: Vec<F>) -> Self
    where
        F: Fn(&T) -> bool + 'static,
    {
        for f in filters {
            self.filters.push(FilterExpr::Predicate(Box::new(f)));
        }
        self
    }

    // 連結(未使用)
    pub fn join<U, F>(
        self,
        join_type: JoinType,
        right_items: Vec<U>,
        on: F,
    ) -> SearchBuilder<Joined<T, U>>
    where
        U: Clone + 'static,
        F: Fn(&T, &U) -> bool + 'static,
    {
        let mut out = vec![];

        for t in self.items {
            let matches: Vec<U> = right_items.iter().filter(|u| on(&t, u)).cloned().collect();

            match join_type {
                JoinType::Inner => {
                    if !matches.is_empty() {
                        out.push(Joined {
                            left: t,
                            right: matches,
                        });
                    }
                }
                JoinType::Left => {
                    out.push(Joined {
                        left: t,
                        right: matches,
                    });
                }
            }
        }

        SearchBuilder {
            items: out,
            filters: vec![],
            order_fns: vec![],
            limit: None,
            offset: None,
        }
    }

    // 未使用
    pub fn and_filter<F>(mut self, f: F) -> Self
    where
        F: Fn(&T) -> bool + 'static,
    {
        self.filters.push(FilterExpr::Predicate(Box::new(f)));
        self
    }

    // 未使用
    pub fn or_filters(mut self, filters: Vec<FilterExpr<T>>) -> Self {
        self.filters.push(FilterExpr::Or(filters));
        self
    }

    // ソート実施
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

    // 取得件数保持
    pub fn limit(mut self, limit: usize) -> Self {
        self.limit = Some(limit);
        self
    }

    // 取得開始位置保持
    pub fn offset(mut self, offset: usize) -> Self {
        self.offset = Some(offset);
        self
    }

    // 絞り込み条件評価
    fn eval_filter(expr: &FilterExpr<T>, item: &T) -> bool {
        match expr {
            FilterExpr::Predicate(f) => f(item),
            FilterExpr::And(list) => list.iter().all(|e| Self::eval_filter(e, item)),
            FilterExpr::Or(list) => list.iter().any(|e| Self::eval_filter(e, item)),
        }
    }

    // データ抽出実行
    pub fn execute(self) -> Vec<T> {
        // newで保持したデータから、絞り込み条件に一致するデータを抽出
        let mut result: Vec<T> = self
            .items
            .into_iter()
            .filter(|item| self.filters.iter().all(|f| Self::eval_filter(f, item)))
            .collect();

        // ソート順指定があれば、ソートする
        // 複数条件は未使用
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

impl<T> IntoOpt<T> for Option<T> {
    fn into_opt(self) -> Option<T> {
        self
    }
}

impl<T: Clone> IntoOpt<T> for &Option<T> {
    fn into_opt(self) -> Option<T> {
        self.clone()
    }
}

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

// // String 系
// impl IntoOpt<String> for String {
//     fn into_opt(self) -> Option<String> {
//         let s = self.trim();
//         if s.is_empty() {
//             None
//         } else {
//             Some(s.to_string())
//         }
//     }
// }

// impl IntoOpt<String> for &String {
//     fn into_opt(self) -> Option<String> {
//         let s = self.trim();
//         if s.is_empty() {
//             None
//         } else {
//             Some(s.to_string())
//         }
//     }
// }

// impl IntoOpt<String> for Option<String> {
//     fn into_opt(self) -> Option<String> {
//         match self {
//             Some(s) if !s.trim().is_empty() => Some(s),
//             _ => None,
//         }
//     }
// }

// impl IntoOpt<String> for &Option<String> {
//     fn into_opt(self) -> Option<String> {
//         match self {
//             Some(s) if !s.trim().is_empty() => Some(s.clone()),
//             _ => None,
//         }
//     }
// }

// // ProjectStatus 系
// impl IntoOpt<ProjectStatus> for ProjectStatus {
//     fn into_opt(self) -> Option<ProjectStatus> {
//         Some(self)
//     }
// }

// impl IntoOpt<ProjectStatus> for &ProjectStatus {
//     fn into_opt(self) -> Option<ProjectStatus> {
//         Some(self.clone())
//     }
// }

// impl IntoOpt<ProjectStatus> for Option<ProjectStatus> {
//     fn into_opt(self) -> Option<ProjectStatus> {
//         self
//     }
// }

// impl IntoOpt<ProjectStatus> for &Option<ProjectStatus> {
//     fn into_opt(self) -> Option<ProjectStatus> {
//         self.clone()
//     }
// }

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

pub struct JoinPlan<T, U> {
    pub join_type: JoinType,
    pub items: Vec<U>,
    pub on: Box<dyn Fn(&T, &U) -> bool>,
}
#[derive(Clone)]
pub struct Joined<T, U> {
    pub left: T,
    pub right: Vec<U>,
}

pub enum FilterExpr<T> {
    And(Vec<FilterExpr<T>>),
    Or(Vec<FilterExpr<T>>),
    Predicate(Box<dyn Fn(&T) -> bool>),
}
