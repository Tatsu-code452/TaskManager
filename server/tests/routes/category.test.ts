// category.ts のルーティング単体テスト

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
jest.mock('../../src/dao/categoryDao', () => ({
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
import * as categoryDao from '../../src/dao/categoryDao';
import app from '../../src/server';

import { setupTestSession } from '../utils/testSession';
import { setUserDaoMock } from '../utils/mockUserDao';

describe('category routes', () => {

  let agent: any;
  let csrfToken: string;

  beforeEach(async () => {
    jest.clearAllMocks();
    setUserDaoMock();
    agent = request.agent(app);
    csrfToken = await setupTestSession(agent);
  });

  it('GET /api/categories: 一覧取得', async () => {
    (categoryDao.default.find as any).mockResolvedValue([{ id: 1, name: 'dummy' }]);
    const res = await agent.get('/api/categories')
      .set('X-CSRF-Token', csrfToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.data[0].name).toBe('dummy');
  });

  it('GET /api/categories/:id: 詳細取得', async () => {
    (categoryDao.default.findById as any).mockResolvedValue({ id: 1, name: 'dummy' });
    const res = await agent.get('/api/categories/1')
      .set('X-CSRF-Token', csrfToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe('dummy');
  });

  it('GET /api/categories/:id: 存在しないID', async () => {
    (categoryDao.default.findById as any).mockResolvedValue(null);
    const res = await agent.get('/api/categories/999')
      .set('X-CSRF-Token', csrfToken);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('POST /api/categories: 新規登録', async () => {
    (categoryDao.default.insert as any).mockResolvedValue({ id: 2, name: 'new' });
    (categoryDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await agent
      .post('/api/categories')
      .set('X-CSRF-Token', csrfToken)
      .send({ data: { id: 2, name: 'new' } });
    expect(res.statusCode).toBe(201);
    expect(res.body.category.name).toBe('new');
  });

  it('POST /api/categories: 必須フィールド不足', async () => {
    const res = await agent
      .post('/api/categories')
      .set('X-CSRF-Token', csrfToken)
      .send({ data: { name: 'noid' } });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('PUT /api/categories/:id: 更新', async () => {
    (categoryDao.default.update as any).mockResolvedValue(1);
    (categoryDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await agent
      .put('/api/categories/1')
      .set('X-CSRF-Token', csrfToken)
      .send({ data: { name: 'updated' } });
    expect(res.statusCode).toBe(200);
    expect(res.body.updated).toBe(1);
  });

  it('PUT /api/categories/:id: データなし', async () => {
    const res = await agent
      .put('/api/categories/1')
      .set('X-CSRF-Token', csrfToken)
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('DELETE /api/categories/:id: 削除', async () => {
    (categoryDao.default.remove as any).mockResolvedValue(1);
    (categoryDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await agent
      .delete('/api/categories/1')
      .set('X-CSRF-Token', csrfToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.deleted).toBe(1);
  });
});
