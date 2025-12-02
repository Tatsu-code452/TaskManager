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
// task.ts のルーティング単体テスト

import request from 'supertest';
import * as taskDao from '../../src/dao/task.dao';
import app from '../../src/server';
import { setupTestSession } from '../utils/testSession';
import { setUserDaoMock } from '../utils/mockUserDao';

// taskDaoをモック
jest.mock('../../src/dao/task.dao', () => ({
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

describe('task routes', () => {
  let agent: any;
  let csrfToken: string;

  beforeEach(async () => {
    jest.clearAllMocks();
    setUserDaoMock();
    agent = request.agent(app);
    csrfToken = await setupTestSession(agent);
  });

  it('GET /api/tasks: 一覧取得', async () => {
    (taskDao.default.find as any).mockResolvedValue([{ id: 1, name: 'dummy' }]);
    const res = await agent.get('/api/tasks').set('X-CSRF-Token', csrfToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.data[0].name).toBe('dummy');
  });

  it('GET /api/tasks/:id: 詳細取得', async () => {
    (taskDao.default.findById as any).mockResolvedValue({ id: 1, name: 'dummy' });
    const res = await agent.get('/api/tasks/1').set('X-CSRF-Token', csrfToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe('dummy');
  });

  it('GET /api/tasks/:id: 存在しないID', async () => {
    (taskDao.default.findById as any).mockResolvedValue(null);
    const res = await agent.get('/api/tasks/999').set('X-CSRF-Token', csrfToken);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('POST /api/tasks: 新規登録', async () => {
    (taskDao.default.insert as any).mockResolvedValue({ id: 2, name: 'new' });
    (taskDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await agent.post('/api/tasks')
      .set('X-CSRF-Token', csrfToken)
      .send({ data: { id: 2, name: 'new' } });
    expect(res.statusCode).toBe(201);
    expect(res.body.task.name).toBe('new');
  });

  it('POST /api/tasks: 必須フィールド不足', async () => {
    const res = await agent.post('/api/tasks')
      .set('X-CSRF-Token', csrfToken)
      .send({ data: { name: 'noid' } });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('PUT /api/tasks/:id: 更新', async () => {
    (taskDao.default.update as any).mockResolvedValue(1);
    (taskDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await agent.set('X-CSRF-Token', csrfToken)
      .put('/api/tasks/1').send({ data: { name: 'updated' } });
    expect(res.statusCode).toBe(200);
    expect(res.body.updated).toBe(1);
  });

  it('PUT /api/tasks/:id: データなし', async () => {
    const res = await agent.set('X-CSRF-Token', csrfToken)
      .put('/api/tasks/1').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('DELETE /api/tasks/:id: 削除', async () => {
    (taskDao.default.remove as any).mockResolvedValue(1);
    (taskDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await agent.set('X-CSRF-Token', csrfToken)
      .delete('/api/tasks/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.deleted).toBe(1);
  });
});
