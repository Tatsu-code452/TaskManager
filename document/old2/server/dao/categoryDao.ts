import { createDao } from "./commonDao";

const TABLE_NAME = "categories";
const COLUMN_NAMES = ["id", "name", "created_at", "updated_at"];

export default createDao(TABLE_NAME, COLUMN_NAMES);
