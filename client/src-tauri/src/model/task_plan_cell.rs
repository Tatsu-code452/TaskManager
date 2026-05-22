use crate::model::macro_model::model_with_default;
use crate::model::time_stamps::Timestamps;

model_with_default!(
    TaskPlanCell,
    TaskPlanCellRequest,
    {
        task_id: String,
        date: String,
    },
    {
        hours: f64,
    }
);
