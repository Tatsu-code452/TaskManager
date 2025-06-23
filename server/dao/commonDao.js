const pool = require("./pool");

const SCHEMA_NAME = "TASK_MANAGE";

// クエリとパラメータの組み立て関数 (検索用)
const buildQuery = (table, criteria) => {
    const params = [];
    const conditions = [];
    let idx = 1;

    for (const [key, value] of Object.entries(criteria)) {
        if (value !== undefined) {
            conditions.push(`"${key}" = $${idx++}`);
            params.push(value);
        }
    }

    // スキーマ名を適用
    const fullTableName = `"${SCHEMA_NAME}"."${table}"`;
    const query = conditions.length
        ? `SELECT * FROM ${fullTableName} WHERE ${conditions.join(" AND ")}`
        : `SELECT * FROM ${fullTableName}`;

    return { query, params };
};

// 更新用のクエリ組み立て関数 (UPDATE 用)
const buildUpdateQuery = (table, updates, id) => {
    if (!id) {
        throw new Error("更新する ID が必要です");
    }

    const params = [];
    const fields = [];
    let idx = 1;

    for (const [key, value] of Object.entries(updates)) {
        if (value !== undefined) {
            fields.push(`"${key}" = $${idx++}`);
            params.push(value);
        }
    }

    if (fields.length === 0) {
        throw new Error("更新するフィールドがありません");
    }

    fields.push(`"updated_at" = $${idx++}`);
    params.push(new Date().toISOString());

    params.push(id);
    const fullTableName = `"${SCHEMA_NAME}"."${table}"`;
    const query = `UPDATE ${fullTableName} SET ${fields.join(
        ", "
    )} WHERE id = $${idx} RETURNING *;`;

    return { query, params };
};

// 定義されたカラム名から、更新可能なキーのみを抽出
const extractData = (obj, columnNames) => {
    return columnNames.filter(isUpdatableKey(obj)).reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
    }, {});
};

// 更新可能なキーを判定するユーティリティ関数
// ここでは "id" キーを除外し、値が undefined でないキーのみを対象とする
const isUpdatableKey = (obj) => {
    return (key) => key !== "id" && obj[key] !== undefined;
};

// ユーティリティ関数: クエリ結果をIDでマップ化
const createMap = (queryResult, key) => {
    const map = new Map();
    const rows = Array.isArray(queryResult?.rows) ? queryResult.rows : [];

    rows.forEach((row) => {
        map.set(row[key], row);
    });

    return map;
};

// データ操作API
async function find(table, criteria = {}) {
    const { query, params } = buildQuery(table, criteria);
    const { rows } = await pool.query(query, params);
    return rows;
}

async function insert(table, columnNames, data) {
    const inserts = extractData(data, columnNames); // 更新可能なキーのみを抽出
    const keys = Object.keys(inserts).map((key) => `"${key}"`);
    const placeholders = Object.keys(inserts).map((_, i) => `$${i + 1}`);
    const values = Object.values(inserts);

    const query = `
        INSERT INTO "${SCHEMA_NAME}"."${table}" 
        (${keys.join(", ")}) 
        VALUES (${placeholders.join(", ")}) 
        RETURNING *;
    `;

    const { rows } = await pool.query(query, values);
    return rows[0];
}

async function update(table, columnNames, id, data) {
    const updates = extractData(data, columnNames); // 更新可能なキーのみを抽出
    const { query, params } = buildUpdateQuery(table, updates, id);
    const { rows } = await pool.query(query, params);
    return rows[0];
}

async function remove(table, id) {
    const query = `DELETE FROM "${SCHEMA_NAME}"."${table}" WHERE id = $1 RETURNING *;`;
    const params = [id];

    const { rows } = await pool.query(query, params);
    return rows[0];
}

// 汎用DAOファクトリ
function createDao(tableName, columnNames) {
    return {
        find: (criteria = {}) => find(tableName, criteria),
        insert: (data) => insert(tableName, columnNames, data),
        update: (id, data) => update(tableName, columnNames, id, data),
        remove: (id) => remove(tableName, id),
        COLUMN_NAMES: columnNames,
    };
}

// モジュールエクスポート
module.exports = {
    find,
    insert,
    update,
    remove,
    createDao,
};
