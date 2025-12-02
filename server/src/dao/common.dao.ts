
import pool, { PoolClient } from "./pool";
import env from "../common/env";

const DB_SCHEMA = env.DB_SCHEMA;

const getFullTableName = (table: string) => `"${DB_SCHEMA}"."${table}"`;

type QueryClient = { query: (text: string, params?: any[]) => Promise<any> } | PoolClient;

/**
 * 汎用的な GenericDao クラス
 * サブクラス（またはインスタンス化）してテーブル単位の DAO を作る想定
 */
export default class GenericDao<T extends Record<string, any>> {
    protected table: string;
    protected columns?: (keyof T)[];
    protected primaryKey: string;

    constructor(table: string, columns?: (keyof T)[], primaryKey = "id") {
        this.table = table;
        this.columns = columns;
        this.primaryKey = primaryKey;
    }

    protected buildWhereClause(criteria: Partial<T>, startIndex = 1) {
        const entries = Object.entries(criteria).filter(([, v]) => v !== undefined);
        const clauses: string[] = [];
        const params: any[] = [];
        entries.forEach(([k, v], i) => {
            clauses.push(`"${k}" = $${startIndex + i}`);
            params.push(v);
        });
        const text = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
        return { text, params };
    }

    protected async runQuery<R = any>(text: string, params: any[] = [], client: QueryClient = pool) {
        const result = await client.query(text, params);
        return result as R;
    }

    /** 条件検索（簡易） */
    async find(criteria: Partial<T> = {}, client: QueryClient = pool): Promise<T[]> {
        const where = this.buildWhereClause(criteria, 1);
        const sql = `SELECT * FROM ${getFullTableName(this.table)} ${where.text}`;
        const res = await this.runQuery<{ rows: T[] }>(sql, where.params, client);
        return res.rows ?? [];
    }

    /** ID 検索 */
    async findById(id: string | number, client: QueryClient = pool): Promise<T | null> {
        const sql = `SELECT * FROM ${getFullTableName(this.table)} WHERE "${this.primaryKey}" = $1`;
        const res = await this.runQuery<{ rows: T[] }>(sql, [id], client);
        return res.rows[0] ?? null;
    }

    /** 挿入（created_at, updated_at を自動追加する慣習のあるテーブル向け） */
    async insert(data: Partial<T>, client: QueryClient = pool): Promise<T> {
        const now = new Date().toISOString();
        const insertData = {
            ...(data as Record<string, any>),
            created_at: (data as any).created_at ?? now,
            updated_at: (data as any).updated_at ?? now,
        } as Record<string, any>;

        const keys = Object.keys(insertData);
        const values = keys.map((k) => insertData[k]);
        const placeholders = keys.map((_, i) => `$${i + 1}`);

        const sql = `INSERT INTO ${getFullTableName(this.table)} (${keys.map((k) => `"${k}"`).join(", ")}) VALUES (${placeholders.join(", ")}) RETURNING *;`;
        const res = await this.runQuery<{ rows: T[] }>(sql, values, client);
        return res.rows[0];
    }

    /** 更新（updated_at 自動更新） */
    async update(id: string | number, updates: Partial<T>, client: QueryClient = pool): Promise<T> {
        if (!id) throw new Error("更新対象の ID が必要です");

        const entries = Object.entries(updates).filter(([, v]) => v !== undefined && v !== null && String(v) !== "");
        if (entries.length === 0) throw new Error("更新フィールドが指定されていません");

        const setClauses = entries.map(([k], i) => `"${k}" = $${i + 1}`);
        const params = entries.map(([, v]) => v);

        // updated_at を自動更新
        setClauses.push(`"updated_at" = $${params.length + 1}`);
        params.push(new Date().toISOString());

        // id パラメータ
        params.push(id);

        const sql = `UPDATE ${getFullTableName(this.table)} SET ${setClauses.join(", ")} WHERE "${this.primaryKey}" = $${params.length} RETURNING *;`;
        const res = await this.runQuery<{ rows: T[] }>(sql, params, client);
        return res.rows[0];
    }

    /** 削除 */
    async remove(id: string | number, client: QueryClient = pool): Promise<T | null> {
        const sql = `DELETE FROM ${getFullTableName(this.table)} WHERE "${this.primaryKey}" = $1 RETURNING *;`;
        const res = await this.runQuery<{ rows: T[] }>(sql, [id], client);
        return res.rows[0] ?? null;
    }

    /** 生クエリ実行ラッパー */
    async query<R = any>(text: string, params: any[] = [], client: QueryClient = pool): Promise<R> {
        const res = await this.runQuery<R>(text, params, client);
        return res;
    }

    /** トランザクションラッパー */
    async transaction<R>(fn: (client: PoolClient) => Promise<R>): Promise<R> {
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
    }
}
