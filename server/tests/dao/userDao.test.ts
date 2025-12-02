import userDao from '../../src/dao/user.dao';
import pool from '../../src/dao/pool';

jest.mock('../../src/dao/pool', () => ({
    __esModule: true,
    default: {
        query: jest.fn(),
        connect: jest.fn(),
    }
}));

describe('userDao', () => {
    const mockRow = {
        id: 1,
        password: 'pass',
        name: 'ユーザーA',
        role: 'admin',
        created_at: '',
        updated_at: ''
    };
    const mockRows = [mockRow, { ...mockRow, id: 2, name: 'ユーザーB' }];
    const mockInsert = { password: 'pass2', name: 'ユーザーC', role: 'user' };
    const mockUpdate = { name: 'ユーザーD' };

    test('transaction: トランザクション実行', async () => {
        (pool.connect as jest.Mock).mockResolvedValue({
            query: jest.fn(),
            release: jest.fn(),
        });
        const fn = jest.fn().mockResolvedValue('ok');
        if (userDao.transaction) {
            const ret = await userDao.transaction(fn);
            expect(ret).toBe('ok');
            expect(fn).toHaveBeenCalled();
        }
    });

    test('型検証: User型', () => {
        const user: import('../../src/types/user.interface').User = {
            id: 1,
            password: 'pass',
            name: 'test',
            role: 'admin',
            created_at: '2025-01-01',
            updated_at: '2025-01-01',
        };
        expect(user).toHaveProperty('id');
        expect(typeof user.name).toBe('string');
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('find: 全件取得', async () => {
        (pool.query as jest.Mock).mockResolvedValue({ rows: mockRows });
        const result = await userDao.find();
        expect(pool.query).toHaveBeenCalled();
        expect(result).toEqual(mockRows);
    });

    test('findById: 1件取得', async () => {
        (pool.query as jest.Mock).mockResolvedValue({ rows: [mockRow] });
        const result = await userDao.findById(1);
        expect(result).toEqual(mockRow);
    });

    test('insert: 追加', async () => {
        const mockResult = { id: 3, ...mockInsert };
        (pool.query as jest.Mock).mockResolvedValue({ rows: [mockResult] });
        const result = await userDao.insert(mockInsert);
        expect(result).toEqual(mockResult);
    });

    test('update: 更新', async () => {
        const updatedRow = { id: 1, name: 'ユーザーD', updated_at: expect.any(String) };
        (pool.query as jest.Mock).mockResolvedValue({ rows: [updatedRow] });
        const result = await userDao.update(1, mockUpdate);
        expect(result).toEqual(updatedRow);
    });

    test('remove: 削除', async () => {
        const mockResult = { id: 1 };
        (pool.query as jest.Mock).mockResolvedValue({ rows: [mockResult] });
        const result = await userDao.remove(1);
        expect(result).toEqual(mockResult);
    });
});
