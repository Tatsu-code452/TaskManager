import statusDao from '../../src/dao/statusDao';
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
        if (statusDao.transaction) {
            const ret = await statusDao.transaction(fn);
            expect(ret).toBe('ok');
            expect(fn).toHaveBeenCalled();
        }
    });

describe('statusDao', () => {
    const mockRow = { id: 1, name: '進行中', color: '#00f', created_at: '', updated_at: '' };
    const mockRows = [mockRow, { id: 2, name: '完了', color: '#0f0', created_at: '', updated_at: '' }];
    const mockInsert = { name: '未着手', color: '#f00' };
    const mockUpdate = { name: '保留' };


    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('型検証: Status型', () => {
        const status: import('../../src/dao/statusDao').Status = {
            id: 1,
            name: '進行中',
            color: '#00f',
            created_at: '2025-01-01',
            updated_at: '2025-01-01',
        };
        expect(status).toHaveProperty('id');
        expect(typeof status.name).toBe('string');
        expect(typeof status.color).toBe('string');
    });

    test('find: 全件取得', async () => {
        (pool.query as jest.Mock).mockResolvedValue({ rows: mockRows });
        const result = await statusDao.find();
        expect(pool.query).toHaveBeenCalled();
        expect(result).toEqual(mockRows);
    });

    test('findById: 1件取得', async () => {
        (pool.query as jest.Mock).mockResolvedValue({ rows: [mockRow] });
        const result = await statusDao.findById(1);
        expect(result).toEqual(mockRow);
    });

    test('insert: 追加', async () => {
        const mockResult = { id: 3, ...mockInsert };
        (pool.query as jest.Mock).mockResolvedValue({ rows: [mockResult] });
        const result = await statusDao.insert(mockInsert);
        expect(result).toEqual(mockResult);
    });

    test('update: 更新', async () => {
        const updatedRow = { id: 1, name: '保留', updated_at: expect.any(String) };
        (pool.query as jest.Mock).mockResolvedValue({ rows: [updatedRow] });
        const result = await statusDao.update(1, mockUpdate);
        expect(result).toEqual(updatedRow);
    });

    test('remove: 削除', async () => {
        const mockResult = { id: 1 };
        (pool.query as jest.Mock).mockResolvedValue({ rows: [mockResult] });
        const result = await statusDao.remove(1);
        expect(result).toEqual(mockResult);
    });
});
