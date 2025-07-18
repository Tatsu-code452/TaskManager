
import pool from "./pool";
import env from "../common/env";

const DB_SCHEMA = env.DB_SCHEMA;

const buildQuery = (table: string, criteria: Record<string, any>) => {
    const params: any[] = [];
    const conditions: string[] = [];
    let idx = 1;
    for (const [key, value] of Object.entries(criteria)) {
        if (value !== undefined) {
            conditions.push(`"${key}" = $${idx++}`);
            params.push(value);
        }
    }
    const fullTableName = `"${DB_SCHEMA}"."${table}"`;
    const query = conditions.length
        ? `SELECT * FROM ${fullTableName} WHERE ${conditions.join(" AND ")}`
        : `SELECT * FROM ${fullTableName}`;
    return { query, params };
};

const buildUpdateQuery = (table: string, updates: Record<string, any>, id: any) => {
    if (!id) throw new Error("更新する ID が必要です");
    const params: any[] = [];
    const fields: string[] = [];
    let idx = 1;
    for (const [key, value] of Object.entries(updates)) {
        if (value !== undefined) {
            fields.push(`"${key}" = $${idx++}`);
            params.push(value);
        }
    }
    if (fields.length === 0) throw new Error("更新するフィールドがありません");
    fields.push(`"updated_at" = $${idx++}`);
    params.push(new Date().toISOString());
    params.push(id);
    const fullTableName = `"${DB_SCHEMA}"."${table}"`;
    const query = `UPDATE ${fullTableName} SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *;`;
    return { query, params };
};

const extractData = (obj: any, columnNames: string[]) => {
    return columnNames.filter(isUpdatableKey(obj)).reduce((acc: any, key: string) => {
        acc[key] = obj[key];
        return acc;
    }, {});
};

const isUpdatableKey = (obj: any) => {
    return (key: string) => key !== "id" && obj[key] !== undefined;
};

const createMap = (queryResult: any, key: string) => {
    const map = new Map();
    const rows = Array.isArray(queryResult?.rows) ? queryResult.rows : [];
    rows.forEach((row: any) => {
        map.set(row[key], row);
    });
    return map;
};

export const createDao = (table: string, columnNames: string[]) => {
    return {
        async find(criteria: Record<string, any> = {}) {
            const { query, params } = buildQuery(table, criteria);
            const result = await pool.query(query, params);
            return result.rows;
        },
        async findById(id: any) {
            const { query, params } = buildQuery(table, { id });
            const result = await pool.query(query, params);
            return result.rows[0] || null;
        },
        async insert(data: any) {
            const now = new Date().toISOString();
            const insertData = { ...data, created_at: now, updated_at: now };
            const keys = columnNames.filter((key) => key !== "id");
            const values = keys.map((key) => insertData[key]);
            const placeholders = keys.map((_, i) => `$${i + 1}`);
            const fullTableName = `"${DB_SCHEMA}"."${table}"`;
            const query = `INSERT INTO ${fullTableName} (${keys
                .map((k) => `"${k}"`)
                .join(", ")}) VALUES (${placeholders.join(", ")}) RETURNING *;`;
            const result = await pool.query(query, values);
            return result.rows[0];
        },
        async update(id: any, updates: any) {
            const updateData = extractData(updates, columnNames);
            const { query, params } = buildUpdateQuery(table, updateData, id);
            const result = await pool.query(query, params);
            return result.rows[0];
        },
        async remove(id: any) {
            const fullTableName = `"${DB_SCHEMA}"."${table}"`;
            const query = `DELETE FROM ${fullTableName} WHERE id = $1 RETURNING *;`;
            const result = await pool.query(query, [id]);
            return result.rows[0];
        },
    };
};
