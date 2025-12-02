import createDao from '../../src/dao/common.dao';
import pool from '../../src/dao/pool';

jest.mock('../../src/dao/pool', () => ({
    query: jest.fn(),
}));

describe('createDao ユーティリティ', () => {
    const table = 'users';
    const columnNames = ['id', 'name', 'email', 'created_at', 'updated_at'];
    const dao = new createDao(table, columnNames);

    const mockRow = { id: 1, name: 'Alice', email: 'alice@example.com', created_at: '', updated_at: '' };
    const mockRows = [mockRow, { id: 2, name: 'Bob', email: 'bob@example.com', created_at: '', updated_at: '' }];
    const mockInsert = { name: 'Charlie', email: 'charlie@example.com' };
    const mockUpdate = { name: 'Dave' };
    const mockUpdateWithUndefined = { name: 'Dave', email: undefined };

    const regex = {
        select: /SELECT \* FROM.*\."users"/i,
        selectWithWhere: /SELECT \* FROM.*\."users".*WHERE.*"name"/i,
        insert: /INSERT INTO.*"users"/i,
        update: /UPDATE.*"users"/i,
        delete: /DELETE FROM.*"users"/i,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('find', () => {
        test.each([
            [{ name: 'Alice' }, [mockRow], regex.selectWithWhere],
            [{ name: undefined }, mockRows, regex.select],
            [undefined, mockRows, regex.select],
        ])('検索条件: %j → 結果: %j', async (criteria, expectedRows, expectedSql) => {
            (pool.query as jest.Mock).mockResolvedValue({ rows: expectedRows });

            const result = await dao.find(criteria);
            expect(pool.query).toHaveBeenCalledWith(expect.stringMatching(expectedSql), expect.any(Array));
            expect(result).toEqual(expectedRows);
        });

        test('DBクエリ失敗時に例外が出る', async () => {
            (pool.query as jest.Mock).mockRejectedValue(new Error('DBエラー'));
            await expect(dao.find({ name: 'Alice' })).rejects.toThrow('DBエラー');
        });
    });

    describe('findById', () => {
        test('指定IDで1件取得できる', async () => {
            (pool.query as jest.Mock).mockResolvedValue({ rows: [mockRow] });
            const result = await dao.findById(1);
            expect(pool.query).toHaveBeenCalledWith(expect.stringMatching(/WHERE.*id/i), [1]);
            expect(result).toEqual(mockRow);
        });

        test('該当データが存在しないと null を返す', async () => {
            (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

            const result = await dao.findById(999); // 存在しないIDの想定
            expect(result).toBeNull();
            expect(pool.query).toHaveBeenCalledWith(
                expect.stringMatching(/SELECT \* FROM.*WHERE.*id/i),
                [999]
            );
        });

        test('DBエラー時に例外が出る', async () => {
            (pool.query as jest.Mock).mockRejectedValue(new Error('検索失敗'));
            await expect(dao.findById(1)).rejects.toThrow('検索失敗');
        });
    });

    describe('insert', () => {
        test('新規登録時にcreated_at, updated_atを含むデータが返る', async () => {
            const mockResult = { id: 3, ...mockInsert };
            (pool.query as jest.Mock).mockResolvedValue({ rows: [mockResult] });

            const result = await dao.insert(mockInsert);

            expect(pool.query).toHaveBeenCalledWith(
                expect.stringMatching(regex.insert),
                expect.arrayContaining(Object.values(mockInsert))
            );
            expect(result).toEqual(mockResult);
        });

        test('DBエラー時に例外が出る', async () => {
            (pool.query as jest.Mock).mockRejectedValue(new Error('挿入失敗'));
            await expect(dao.insert(mockInsert)).rejects.toThrow('挿入失敗');
        });
    });

    describe('update', () => {
        test('指定IDのデータを更新できる', async () => {
            const updatedRow = { id: 3, name: 'Dave', updated_at: expect.any(String) };
            (pool.query as jest.Mock).mockResolvedValue({ rows: [updatedRow] });

            const result = await dao.update(3, mockUpdate);

            expect(pool.query).toHaveBeenCalledWith(expect.stringMatching(regex.update), expect.any(Array));
            expect(result).toEqual(updatedRow);
        });

        test('IDなしで更新を呼び出すと例外が出る', async () => {
            await expect(dao.update(undefined as any, mockUpdate)).rejects.toThrow('更新対象の ID が必要です');
        });

        test('更新フィールドなしで呼び出すと例外が出る', async () => {
            await expect(dao.update(1, { name: undefined })).rejects.toThrow('更新フィールドが指定されていません');
        });

        test('DBエラー時に例外が出る', async () => {
            (pool.query as jest.Mock).mockRejectedValue(new Error('更新失敗'));
            await expect(dao.update(1, mockUpdate)).rejects.toThrow('更新失敗');
        });
    });

    describe('remove', () => {
        test('指定IDで削除できる', async () => {
            const mockResult = { id: 4 };
            (pool.query as jest.Mock).mockResolvedValue({ rows: [mockResult] });

            const result = await dao.remove(4);

            expect(pool.query).toHaveBeenCalledWith(expect.stringMatching(regex.delete), [4]);
            expect(result).toEqual(mockResult);
        });

        test('DBエラー時に例外が出る', async () => {
            (pool.query as jest.Mock).mockRejectedValue(new Error('削除失敗'));
            await expect(dao.remove(999)).rejects.toThrow('削除失敗');
        });
    });
});