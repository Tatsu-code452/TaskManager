const {
    find: baseFind,
    insert: baseInsert,
    update: baseUpdate,
    remove: baseRemove,
} = require("./commonDao");

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

/**
 * 指定したオブジェクトからid以外の有効なカラムのみ抽出
 * @param {Object} obj - 対象オブジェクト
 * @returns {Object} - id以外の有効なカラムのみを持つ新オブジェクト
 */
function extractData(obj) {
    return COLUMN_NAMES
        .filter(isUpdatableKey(obj))
        .reduce((acc, key) => {
            acc[key] = obj[key];
            return acc;
        }, {});
}

/**
 * id以外かつ値がundefinedでないカラムのみ許可
 * @param {Object} obj
 * @returns {(key: string) => boolean}
 */
function isUpdatableKey(obj) {
    return (key) => key !== "id" && obj[key] !== undefined;
}

// タスク一覧取得API
async function find(criteria = {}) {
    return baseFind(TABLE_NAME, criteria);
}

// タスク登録API
async function insert(task) {
    return baseInsert(TABLE_NAME, extractData(task));
}

// タスク更新API
async function update(id, task) {
    return baseUpdate(TABLE_NAME, id, extractData(task));
}

// タスク削除API
async function remove(id) {
    return baseRemove(TABLE_NAME, id);
}

module.exports = {
    find,
    insert,
    update,
    remove,
};
