import phaseDao from '../../src/dao/phaseDao';
import pool from '../../src/dao/pool';

jest.mock('../../src/dao/pool', () => ({
    query: jest.fn(),
}));

describe('phaseDao', () => {
    const mockRow = { id: 1, name: '要件定義', sort_no: 1, created_at: '', updated_at: '' };
    const mockRows = [mockRow, { id: 2, name: '設計', sort_no: 2, created_at: '', updated_at: '' }];
    const mockInsert = { name: '実装', sort_no: 3 };
    const mockUpdate = { name: 'テスト' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('find: 全件取得', async () => {
        (pool.query as jest.Mock).mockResolvedValue({ rows: mockRows });
        const result = await phaseDao.find();
        expect(pool.query).toHaveBeenCalled();
        expect(result).toEqual(mockRows);
    });

    test('findById: 1件取得', async () => {
        (pool.query as jest.Mock).mockResolvedValue({ rows: [mockRow] });
        const result = await phaseDao.findById(1);
        expect(result).toEqual(mockRow);
    });

    test('insert: 追加', async () => {
        const mockResult = { id: 3, ...mockInsert };
        (pool.query as jest.Mock).mockResolvedValue({ rows: [mockResult] });
        const result = await phaseDao.insert(mockInsert);
        expect(result).toEqual(mockResult);
    });

    test('update: 更新', async () => {
        const updatedRow = { id: 1, name: 'テスト', updated_at: expect.any(String) };
        (pool.query as jest.Mock).mockResolvedValue({ rows: [updatedRow] });
        const result = await phaseDao.update(1, mockUpdate);
        expect(result).toEqual(updatedRow);
    });

    test('remove: 削除', async () => {
        const mockResult = { id: 1 };
        (pool.query as jest.Mock).mockResolvedValue({ rows: [mockResult] });
        const result = await phaseDao.remove(1);
        expect(result).toEqual(mockResult);
    });
});
