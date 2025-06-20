const commonDao = require("../../../dao/commonDao");
const pool = require("../../../dao/pool");

// pool.queryをモック化
jest.mock("../../../dao/pool", () => ({
    query: jest.fn(),
}));

describe("commonDao", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("buildQuery", () => {
        it("criteria指定時に正しいクエリを返す", () => {
            const { query, params } = commonDao.buildQuery("test_table", {
                id: 1,
                name: "foo",
            });
            expect(query).toMatch(/SELECT \* FROM/);
            expect(params).toEqual([1, "foo"]);
        });
        it("criteria未指定時に全件取得クエリを返す", () => {
            const { query, params } = commonDao.buildQuery("test_table", {});
            expect(query).toMatch(/SELECT \* FROM/);
            expect(params).toEqual([]);
        });
    });

    describe("buildUpdateQuery", () => {
        it("更新クエリが正しく生成される", () => {
            const { query, params } = commonDao.buildUpdateQuery(
                "test_table",
                { name: "bar" },
                1
            );
            expect(query).toMatch(/UPDATE/);
            expect(params[0]).toBe("bar");
            expect(params[2]).toBe(1);
        });
        it("id未指定でエラー", () => {
            expect(() =>
                commonDao.buildUpdateQuery("test_table", { name: "bar" })
            ).toThrow();
        });
        it("更新フィールドなしでエラー", () => {
            expect(() =>
                commonDao.buildUpdateQuery("test_table", {}, 1)
            ).toThrow();
        });
    });

    describe("createMap", () => {
        it("rowsをkeyでMap化", () => {
            const rows = [
                { id: 1, v: "a" },
                { id: 2, v: "b" },
            ];
            const map = commonDao.createMap({ rows }, "id");
            expect(map.get(1).v).toBe("a");
            expect(map.get(2).v).toBe("b");
        });
    });

    describe("find", () => {
        it("pool.queryが呼ばれ結果が返る", async () => {
            pool.query.mockResolvedValue({ rows: [{ id: 1 }] });
            const rows = await commonDao.find("test_table", { id: 1 });
            expect(pool.query).toHaveBeenCalled();
            expect(rows[0].id).toBe(1);
        });
    });

    describe("insert", () => {
        it("insertクエリでpool.queryが呼ばれる", async () => {
            pool.query.mockResolvedValue({ rows: [{ id: 2, name: "foo" }] });
            const row = await commonDao.insert("test_table", { name: "foo" });
            expect(pool.query).toHaveBeenCalled();
            expect(row.name).toBe("foo");
        });
    });

    describe("update", () => {
        it("updateクエリでpool.queryが呼ばれる", async () => {
            pool.query.mockResolvedValue({ rows: [{ id: 3, name: "bar" }] });
            const row = await commonDao.update("test_table", 3, {
                name: "bar",
            });
            expect(pool.query).toHaveBeenCalled();
            expect(row.id).toBe(3);
        });
    });

    describe("remove", () => {
        it("deleteクエリでpool.queryが呼ばれる", async () => {
            pool.query.mockResolvedValue({ rows: [{ id: 4 }] });
            const row = await commonDao.remove("test_table", 4);
            expect(pool.query).toHaveBeenCalled();
            expect(row.id).toBe(4);
        });
    });
});
