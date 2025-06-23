const { createDao } = require("./commonDao");

const TABLE_NAME = "project_master";
const COLUMN_NAMES = ["id", "name", "description", "start_date", "end_date"];

module.exports = createDao(TABLE_NAME, COLUMN_NAMES);
