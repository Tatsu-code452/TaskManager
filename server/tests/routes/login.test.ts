// login.ts のルーティング単体テスト

import request from 'supertest';
import * as userDao from '../../src/dao/userDao';
import app from '../../src/server';

// userDaoをモック
jest.mock('../../src/dao/userDao', () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    findById: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    transaction: jest.fn(),
  }
}));

describe('login routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('POST /login: 正常', async () => {
    (userDao.default.find as any).mockResolvedValue([{ id: 1, name: 'test', password: 'test' }]);
    const res = await request(app)
      .post('/api/login').send({ username: 'test', password: 'test' });
    expect(res.statusCode).toBe(200);
  });

  it('POST /login: 認証失敗', async () => {
    (userDao.default.find as any).mockResolvedValue([]);
    const res = await request(app)
      .post('/api/login').send({ username: 'wrong', password: 'wrong' });
    expect(res.statusCode).toBe(400);
  });

  it('POST /login: サーバーエラー', async () => {
    (userDao.default.find as any).mockRejectedValue(new Error('DB error'));
    const res = await request(app)
      .post('/api/login').send({ username: 'test', password: 'test' });
    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBeDefined();
  });
});
