import pool from "./pool";
import env from "../common/env";

const DB_SCHEMA = env.DB_SCHEMA;

/**
 * スキーマ付きテーブル名を生成
 */
const getFullTableName = (table: string): string => `"${DB_SCHEMA}"."${table}"`;

/**
 * SELECT クエリ構築
 */
const buildSelectQuery = <T extends Record<string, unknown>>(table: string, criteria: Partial<T>) => {
    const entries = Object.entries(criteria).filter(([, v]) => v !== undefined);
    const conditions = entries.map(([key], i) => `"${key}" = $${i + 1}`);
    const params = entries.map(([, value]) => value);

    const query = conditions.length
        ? `SELECT * FROM ${getFullTableName(table)} WHERE ${conditions.join(" AND ")}`
        : `SELECT * FROM ${getFullTableName(table)}`;

    return { query, params };
};

/**
 * UPDATE クエリ構築（updated_at 自動追加）
 */
const buildUpdateQuery = <T extends Record<string, unknown>>(table: string, updates: Partial<T>, id: string | number) => {
    if (!id) throw new Error("更新する ID が必要です");

    const entries = Object.entries(updates).filter(([, v]) => v !== undefined);
    if (entries.length === 0) throw new Error("更新するフィールドがありません");

    const fields = entries.map(([key], i) => `"${key}" = $${i + 1}`);
    const params = entries.map(([, value]) => value);

    fields.push(`"updated_at" = $${entries.length + 1}`);
    params.push(new Date().toISOString());

    const query = `UPDATE ${getFullTableName(table)} SET ${fields.join(", ")} WHERE id = $${params.length + 1} RETURNING *;`;
    params.push(id);

    return { query, params };
};

/**
 * 更新可能フィールド抽出（id除外）
 */
const extractUpdatableFields = <T extends Record<string, unknown>>(data: Partial<T>, columns: (keyof T)[]): Partial<T> => {
    return columns.reduce((acc, key) => {
        if (key !== "id" && data[key] !== undefined) {
            acc[key] = data[key];
        }
        return acc;
    }, {} as Partial<T>);
};

/**
 * insert用の型（id, created_at, updated_at を除外）
 */
type Insertable<T> = Omit<T, "id" | "created_at" | "updated_at">;

/**
 * DAOファクトリ関数（トランザクション対応）
 */
export const createDao = <T extends Record<string, unknown>>(table: string, columnNames: (keyof T)[]) => {
    return {
        /** 条件検索 */
        async find(criteria: Partial<T> = {}, client: { query: Function } = pool) {
            const { query, params } = buildSelectQuery<T>(table, criteria);
            const result = await client.query(query, params);
            return result.rows as T[];
        },

        /** ID検索 */
        async findById(id: string | number, client: { query: Function } = pool) {
            const { query, params } = buildSelectQuery<T>(table, { id } as unknown as Partial<T>);
            const result = await client.query(query, params);
            return result.rows[0] as T ?? null;
        },

        /** 挿入（created_at, updated_at 自動追加） */
        async insert(data: Insertable<T>, client: { query: Function } = pool) {
            const now = new Date().toISOString();
            const insertData = {
                ...(data as Insertable<T>),
                created_at: now,
                updated_at: now,
            };

            const keys = Object.keys(insertData);
            const values = keys.map((key) => (insertData as Record<string, unknown>)[key]);
            const placeholders = keys.map((_, i) => `$${i + 1}`);

            const query = `INSERT INTO ${getFullTableName(table)} (${keys.map((k) => `"${String(k)}"`).join(", ")}) VALUES (${placeholders.join(", ")}) RETURNING *;`;
            const result = await client.query(query, values);
            return result.rows[0] as T;
        },

        /** 更新（updated_at 自動更新） */
        async update(id: string | number, updates: Partial<T>, client: { query: Function } = pool) {
            const updateData = extractUpdatableFields(updates, columnNames);
            const { query, params } = buildUpdateQuery(table, updateData, id);
            const result = await client.query(query, params);
            return result.rows[0] as T;
        },

        /** 削除 */
        async remove(id: string | number, client: { query: Function } = pool) {
            const query = `DELETE FROM ${getFullTableName(table)} WHERE id = $1 RETURNING *;`;
            const result = await client.query(query, [id]);
            return result.rows[0] as T;
        },

        /** トランザクションラッパー */
        async transaction<R>(fn: (client: import("pg").PoolClient) => Promise<R>): Promise<R> {
            const client = await pool.connect();
            try {
                await client.query("BEGIN");
                const result = await fn(client);
                await client.query("COMMIT");
                return result;
            } catch (err) {
                await client.query("ROLLBACK");
                throw err;
            } finally {
                client.release();
            }
        },
    };
};