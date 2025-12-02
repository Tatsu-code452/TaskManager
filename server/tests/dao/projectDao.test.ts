import projectDao from '../../src/dao/project.dao';
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
    if (projectDao.transaction) {
        const ret = await projectDao.transaction(fn);
        expect(ret).toBe('ok');
        expect(fn).toHaveBeenCalled();
    }
});

describe('projectDao', () => {
    const mockRow = { id: 1, name: 'プロジェクトA', start_date: '', end_date: '', created_at: '', updated_at: '' };
    const mockRows = [mockRow, { id: 2, name: 'プロジェクトB', start_date: '', end_date: '', created_at: '', updated_at: '' }];
    const mockInsert = { name: 'プロジェクトC', start_date: '', end_date: '' };
    const mockUpdate = { name: 'プロジェクトD' };


    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('型検証: Project型', () => {
        const project: import('../../src/types/project.interface').Project = {
            id: 1,
            name: 'プロジェクトA',
            start_date: '2025-01-01',
            end_date: '2025-01-31',
            created_at: '2025-01-01',
            updated_at: '2025-01-01',
        };
        expect(project).toHaveProperty('id');
        expect(typeof project.name).toBe('string');
    });

    test('find: 全件取得', async () => {
        (pool.query as jest.Mock).mockResolvedValue({ rows: mockRows });
        const result = await projectDao.find();
        expect(pool.query).toHaveBeenCalled();
        expect(result).toEqual(mockRows);
    });

    test('findById: 1件取得', async () => {
        (pool.query as jest.Mock).mockResolvedValue({ rows: [mockRow] });
        const result = await projectDao.findById(1);
        expect(result).toEqual(mockRow);
    });

    test('insert: 追加', async () => {
        const mockResult = { id: 3, ...mockInsert };
        (pool.query as jest.Mock).mockResolvedValue({ rows: [mockResult] });
        const result = await projectDao.insert(mockInsert);
        expect(result).toEqual(mockResult);
    });

    test('update: 更新', async () => {
        const updatedRow = { id: 1, name: 'プロジェクトD', updated_at: expect.any(String) };
        (pool.query as jest.Mock).mockResolvedValue({ rows: [updatedRow] });
        const result = await projectDao.update(1, mockUpdate);
        expect(result).toEqual(updatedRow);
    });

    test('remove: 削除', async () => {
        const mockResult = { id: 1 };
        (pool.query as jest.Mock).mockResolvedValue({ rows: [mockResult] });
        const result = await projectDao.remove(1);
        expect(result).toEqual(mockResult);
    });
});
