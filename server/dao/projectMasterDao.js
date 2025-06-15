const {
    find: baseFind,
    insert: baseInsert,
    update: baseUpdate,
    remove: baseRemove,
} = require("./commonDao");

const TABLE_NAME = "project_master";
const COLUMN_NAMES = ["id", "name", "description", "start_date", "end_date"];

function extractData(obj) {
    return COLUMN_NAMES.filter(isUpdatableKey(obj)).reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
    }, {});
}

function isUpdatableKey(obj) {
    return (key) => key !== "id" && obj[key] !== undefined;
}

async function find(criteria = {}) {
    return baseFind(TABLE_NAME, criteria);
}
async function insert(data) {
    return baseInsert(TABLE_NAME, extractData(data));
}
async function update(id, data) {
    return baseUpdate(TABLE_NAME, id, extractData(data));
}
async function remove(id) {
    return baseRemove(TABLE_NAME, id);
}

module.exports = {
    find,
    insert,
    update,
    remove,
};
