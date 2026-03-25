use crate::define_model_all;
use crate::model::time_stamps::Timestamps;
use serde::{Deserialize};

define_model_all!(
    TaskActualCell,
    TaskActualCellRequest,
    TaskActualCellRequest,
    {
        task_id: String,
        date: String,
    },
    {
        hours: f64 => 0.0,
    }
);
