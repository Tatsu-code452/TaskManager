
import categoryDao from '../../src/dao/categoryDao';
import pool from '../../src/dao/pool';

jest.mock('../../src/dao/pool', () => ({
    query: jest.fn(),
    connect: jest.fn(),
}));
    test('transaction: トランザクション実行', async () => {
        (pool.connect as jest.Mock).mockResolvedValue({
            query: jest.fn(),
            release: jest.fn(),
        });
        const fn = jest.fn().mockResolvedValue('ok');
        if (categoryDao.transaction) {
            const ret = await categoryDao.transaction(fn);
            expect(ret).toBe('ok');
            expect(fn).toHaveBeenCalled();
        }
    });

describe('categoryDao', () => {
    const mockRow = { id: 1, name: 'カテゴリA', created_at: '', updated_at: '' };
    const mockRows = [mockRow, { id: 2, name: 'カテゴリB', created_at: '', updated_at: '' }];
    const mockInsert = { name: 'カテゴリC' };
    const mockUpdate = { name: 'カテゴリD' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

        test('型検証: Category型', () => {
            const category: import('../../src/dao/categoryDao').Category = {
                id: 1,
                name: 'カテゴリA',
                created_at: '2025-01-01',
                updated_at: '2025-01-01',
            };
            expect(category).toHaveProperty('id');
            expect(typeof category.name).toBe('string');
        });

        test('find: 全件取得', async () => {
            (pool.query as jest.Mock).mockResolvedValue({ rows: mockRows });
            const result = await categoryDao.find();
            expect(pool.query).toHaveBeenCalled();
            expect(result).toEqual(mockRows);
        });

        test('findById: 1件取得', async () => {
            (pool.query as jest.Mock).mockResolvedValue({ rows: [mockRow] });
            const result = await categoryDao.findById(1);
            expect(result).toEqual(mockRow);
        });

        test('insert: 追加', async () => {
            const mockResult = { id: 3, ...mockInsert };
            (pool.query as jest.Mock).mockResolvedValue({ rows: [mockResult] });
            const result = await categoryDao.insert(mockInsert);
            expect(result).toEqual(mockResult);
        });

        test('update: 更新', async () => {
            const updatedRow = { id: 1, name: 'カテゴリD', updated_at: expect.any(String) };
            (pool.query as jest.Mock).mockResolvedValue({ rows: [updatedRow] });
            const result = await categoryDao.update(1, mockUpdate);
            expect(result).toEqual(updatedRow);
        });

        test('remove: 削除', async () => {
            const mockResult = { id: 1 };
            (pool.query as jest.Mock).mockResolvedValue({ rows: [mockResult] });
            const result = await categoryDao.remove(1);
            expect(result).toEqual(mockResult);
        });
});
