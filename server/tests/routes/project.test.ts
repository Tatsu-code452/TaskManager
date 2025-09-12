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
// project.ts のルーティング単体テスト

import request from 'supertest';
import * as projectDao from '../../src/dao/projectDao';
import app from '../../src/server';
import { setupTestSession } from '../utils/testSession';
import { setUserDaoMock } from '../utils/mockUserDao';

// projectDaoをモック
jest.mock('../../src/dao/projectDao', () => ({
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

describe('project routes', () => {
  let agent: any;
  let csrfToken: string;

  beforeEach(async () => {
    jest.clearAllMocks();
    setUserDaoMock();
    agent = request.agent(app);
    csrfToken = await setupTestSession(agent);
  });

  it('GET /api/projects: 一覧取得', async () => {
    (projectDao.default.find as any).mockResolvedValue([{ id: 1, name: 'dummy' }]);
    const res = await agent.get('/api/projects').set('X-CSRF-Token', csrfToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.data[0].name).toBe('dummy');
  });

  it('GET /api/projects/:id: 詳細取得', async () => {
    (projectDao.default.findById as any).mockResolvedValue({ id: 1, name: 'dummy' });
    const res = await agent.get('/api/projects/1').set('X-CSRF-Token', csrfToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe('dummy');
  });

  it('GET /api/projects/:id: 存在しないID', async () => {
    (projectDao.default.findById as any).mockResolvedValue(null);
    const res = await agent.get('/api/projects/999').set('X-CSRF-Token', csrfToken);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('POST /api/projects: 新規登録', async () => {
    (projectDao.default.insert as any).mockResolvedValue({ id: 2, name: 'new' });
    (projectDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await agent.post('/api/projects')
      .set('X-CSRF-Token', csrfToken)
      .send({ data: { id: 2, name: 'new' } });
    expect(res.statusCode).toBe(201);
    expect(res.body.project.name).toBe('new');
  });

  it('POST /api/projects: 必須フィールド不足', async () => {
    const res = await agent.post('/api/projects')
      .set('X-CSRF-Token', csrfToken)
      .send({ data: { name: 'noid' } });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('PUT /api/projects/:id: 更新', async () => {
    (projectDao.default.update as any).mockResolvedValue(1);
    (projectDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await agent.put('/api/projects/1').set('X-CSRF-Token', csrfToken).send({ data: { name: 'updated' } });
    expect(res.statusCode).toBe(200);
    expect(res.body.updated).toBe(1);
  });

  it('PUT /api/projects/:id: データなし', async () => {
    const res = await agent.put('/api/projects/1').set('X-CSRF-Token', csrfToken).send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('DELETE /api/projects/:id: 削除', async () => {
    (projectDao.default.remove as any).mockResolvedValue(1);
    (projectDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await agent.set('X-CSRF-Token', csrfToken).delete('/api/projects/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.deleted).toBe(1);
  });
});
