use crate::define_model;
use crate::model::time_stamps::Timestamps;
use serde::Deserialize;

define_model!(
    TaskPlanCell,
    TaskPlanCellRequest,
    TaskPlanCellRequest,
    {
        task_id: String,
        date: String,
    },
    {
        hours: f64,
    },
    {
        hours: 0.0,
    }
);
