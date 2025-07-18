import { createDao } from "./commonDao";

const TABLE_NAME = "statuses";
const COLUMN_NAMES = ["id", "name", "color", "created_at", "updated_at"];

export default createDao(TABLE_NAME, COLUMN_NAMES);
