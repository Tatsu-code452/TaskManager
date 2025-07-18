import { createDao } from "./commonDao";

const TABLE_NAME = "users";
const COLUMN_NAMES = [
    "id",
    "password",
    "name",
    "role",
    "created_at",
    "updated_at",
];

export default createDao(TABLE_NAME, COLUMN_NAMES);
