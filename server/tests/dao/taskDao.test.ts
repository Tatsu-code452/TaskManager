import taskDao from '../../src/dao/taskDao';
import pool from '../../src/dao/pool';

jest.mock('../../src/dao/pool', () => ({
    query: jest.fn(),
}));

describe('taskDao', () => {
    const mockRow = {
        id: 1,
        name: 'タスクA',
        project_id: 1,
        phase_id: 1,
        category_id: 1,
        user_id: 1,
        planned_start_date: '',
        planned_end_date: '',
        planned_effort: 10,
        actual_start_date: '',
        actual_end_date: '',
        actual_effort: 8,
        status_id: 1,
        progress_rate: 50,
        priority: 1,
        pre_task_id: null,
        next_task_id: null,
        created_at: '',
        updated_at: ''
    };
    const mockRows = [mockRow, { ...mockRow, id: 2, name: 'タスクB' }];
    const mockInsert = {
        name: 'タスクC',
        project_id: 1,
        phase_id: 1,
        category_id: 1,
        user_id: 1,
        planned_start_date: '',
        planned_end_date: '',
        planned_effort: 5,
        actual_start_date: '',
        actual_end_date: '',
        actual_effort: 0,
        status_id: 1,
        progress_rate: 0,
        priority: 2,
        pre_task_id: null,
        next_task_id: null
    };
    const mockUpdate = { name: 'タスクD' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('find: 全件取得', async () => {
        (pool.query as jest.Mock).mockResolvedValue({ rows: mockRows });
        const result = await taskDao.find();
        expect(pool.query).toHaveBeenCalled();
        expect(result).toEqual(mockRows);
    });

    test('findById: 1件取得', async () => {
        (pool.query as jest.Mock).mockResolvedValue({ rows: [mockRow] });
        const result = await taskDao.findById(1);
        expect(result).toEqual(mockRow);
    });

    test('insert: 追加', async () => {
        const mockResult = { id: 3, ...mockInsert };
        (pool.query as jest.Mock).mockResolvedValue({ rows: [mockResult] });
        const result = await taskDao.insert(mockInsert);
        expect(result).toEqual(mockResult);
    });

    test('update: 更新', async () => {
        const updatedRow = { id: 1, name: 'タスクD', updated_at: expect.any(String) };
        (pool.query as jest.Mock).mockResolvedValue({ rows: [updatedRow] });
        const result = await taskDao.update(1, mockUpdate);
        expect(result).toEqual(updatedRow);
    });

    test('remove: 削除', async () => {
        const mockResult = { id: 1 };
        (pool.query as jest.Mock).mockResolvedValue({ rows: [mockResult] });
        const result = await taskDao.remove(1);
        expect(result).toEqual(mockResult);
    });
});
