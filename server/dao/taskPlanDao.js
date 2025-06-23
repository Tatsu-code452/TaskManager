const { createDao } = require("./commonDao");

const TABLE_NAME = "task_plan";
const COLUMN_NAMES = [
    "id",
    "project_id",
    "phase_id",
    "category_id",
    "user_id",
    "title",
    "description",
    "planned_start_date",
    "planned_end_date",
    "effort",
    "status",
];

module.exports = createDao(TABLE_NAME, COLUMN_NAMES);
