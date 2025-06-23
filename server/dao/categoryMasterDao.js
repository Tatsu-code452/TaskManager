const { createDao } = require("./commonDao");

const TABLE_NAME = "category_master";
const COLUMN_NAMES = ["id", "name", "description"];

module.exports = createDao(TABLE_NAME, COLUMN_NAMES);
