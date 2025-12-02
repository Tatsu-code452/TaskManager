// login.ts のルーティング単体テスト
jest.mock('../../src/dao/user.dao', () => ({
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

import request from 'supertest';
import * as userDao from '../../src/dao/user.dao';
import app from '../../src/server';
import { setupTestSession } from '../utils/testSession';
import { setUserDaoMock } from '../utils/mockUserDao';

describe('login routes', () => {
  let agent: any;
  let csrfToken: string;

  beforeEach(async () => {
    jest.clearAllMocks();
    setUserDaoMock();
    agent = request.agent(app);
    csrfToken = await setupTestSession(agent);
  });

  it('POST /login: 正常', async () => {
    (userDao.default.find as any).mockResolvedValue([{ id: 1, name: 'test', password: 'test' }]);
    const res = await agent.set('X-CSRF-Token', csrfToken)
      .post('/api/login').send({ username: 'test', password: 'test' });
    expect(res.statusCode).toBe(200);
  });

  it('POST /login: 認証失敗', async () => {
    (userDao.default.find as any).mockResolvedValue([]);
    const res = await agent.set('X-CSRF-Token', csrfToken)
      .post('/api/login').send({ username: 'wrong', password: 'wrong' });
    expect(res.statusCode).toBe(400);
  });

  it('POST /login: サーバーエラー', async () => {
    (userDao.default.find as any).mockRejectedValue(new Error('DB error'));
    const res = await agent.set('X-CSRF-Token', csrfToken)
      .post('/api/login').send({ username: 'test', password: 'test' });
    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBeDefined();
  });
});
