import request from "supertest";
import app from "../../src/server";
import pool from "../../src/dao/pool";

const userId = 100;
const testUser = { id: 100, password: "testpass", name: "テストユーザ", role: "1" };

beforeAll(async () => {
    // テスト用ユーザが存在する場合は削除しておく
    await pool.query(`DELETE FROM users WHERE id = $1`, [userId]);
});

afterAll(async () => {
    await pool.end(); // これでDBコネクションを完全に閉じる
});

describe("user API integration - CRUD正常系・異常系シナリオ", () => {

    it("ユーザCRUD正常系・異常系", async () => {
        // --- 削除（異常系: 存在しないID） ---
        let res = await request(app).delete(`/api/users/${userId}`);
        expect(res.statusCode).toBe(200);

        // --- 登録（正常系） ---
        res = await request(app).post("/api/users").send({ data: testUser });
        expect(res.statusCode).toBe(201);

        // --- 登録（異常系: 重複ID） ---
        res = await request(app).post("/api/users").send({ data: testUser });
        expect(res.statusCode).toBe(500);

        // --- 登録（異常系: 必須項目不足） ---
        res = await request(app).post("/api/users").send({ data: { name: "noid" } });
        expect(res.statusCode).toBe(400);

        // --- 一覧取得（正常系） ---
        res = await request(app).get("/api/users");
        expect(res.statusCode).toBe(200);
        expect(res.body.data.some((u: any) => u.id === userId)).toBe(true);

        // --- 詳細取得（正常系） ---
        res = await request(app).get(`/api/users/${userId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.name).toBe(testUser.name);

        // --- 詳細取得（異常系: 存在しないID） ---
        res = await request(app).get(`/api/users/99999`);
        expect(res.statusCode).toBe(400);

        // --- 更新（正常系） ---
        res = await request(app).put(`/api/users/${userId}`).send({ data: { name: "更新ユーザ" } });
        expect(res.statusCode).toBe(200);

        // --- 更新（異常系: データなし） ---
        res = await request(app).put(`/api/users/${userId}`).send({});
        expect(res.statusCode).toBe(400);

        // --- 更新（異常系: 存在しないID） ---
        res = await request(app).put(`/api/users/99999`).send({ data: { name: "存在しない" } });
        expect(res.statusCode).toBe(200);
        // 存在しないIDの更新は成功扱い（影響行数0）になるため、200を期待

        // --- 削除（正常系） ---
        res = await request(app).delete(`/api/users/${userId}`);
        expect(res.statusCode).toBe(200);

        // --- 削除（異常系: 既に削除済み） ---
        res = await request(app).delete(`/api/users/${userId}`);
        expect(res.statusCode).toBe(200);
    });
});
