const { createDao } = require("./commonDao");

const TABLE_NAME = "USER";
const COLUMN_NAMES = [
    "id",
    "username",
    "password",
    "display_name",
    "email",
    "role",
];

module.exports = createDao(TABLE_NAME, COLUMN_NAMES);
