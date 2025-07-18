import { createDao } from "./commonDao";

const TABLE_NAME = "phases";
const COLUMN_NAMES = ["id", "name", "sort_no", "created_at", "updated_at"];

export default createDao(TABLE_NAME, COLUMN_NAMES);
