import { createDao } from "./commonDao";

const TABLE_NAME = "projects";
const COLUMN_NAMES = [
    "id",
    "name",
    "start_date",
    "end_date",
    "created_at",
    "updated_at",
];

export default createDao(TABLE_NAME, COLUMN_NAMES);
