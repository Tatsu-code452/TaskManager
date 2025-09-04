// task.ts のルーティング単体テスト

import request from 'supertest';
import * as taskDao from '../../src/dao/taskDao';
import app from '../../src/server';

// taskDaoをモック
jest.mock('../../src/dao/taskDao', () => ({
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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/tasks: 一覧取得', async () => {
    (taskDao.default.find as any).mockResolvedValue([{ id: 1, name: 'dummy' }]);
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body.data[0].name).toBe('dummy');
  });

  it('GET /api/tasks/:id: 詳細取得', async () => {
    (taskDao.default.findById as any).mockResolvedValue({ id: 1, name: 'dummy' });
    const res = await request(app).get('/api/tasks/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe('dummy');
  });

  it('GET /api/tasks/:id: 存在しないID', async () => {
    (taskDao.default.findById as any).mockResolvedValue(null);
    const res = await request(app).get('/api/tasks/999');
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('POST /api/tasks: 新規登録', async () => {
    (taskDao.default.insert as any).mockResolvedValue({ id: 2, name: 'new' });
    (taskDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await request(app).post('/api/tasks').send({ data: { id: 2, name: 'new' } });
    expect(res.statusCode).toBe(201);
    expect(res.body.task.name).toBe('new');
  });

  it('POST /api/tasks: 必須フィールド不足', async () => {
    const res = await request(app).post('/api/tasks').send({ data: { name: 'noid' } });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('PUT /api/tasks/:id: 更新', async () => {
    (taskDao.default.update as any).mockResolvedValue(1);
    (taskDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await request(app).put('/api/tasks/1').send({ data: { name: 'updated' } });
    expect(res.statusCode).toBe(200);
    expect(res.body.updated).toBe(1);
  });

  it('PUT /api/tasks/:id: データなし', async () => {
    const res = await request(app).put('/api/tasks/1').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('DELETE /api/tasks/:id: 削除', async () => {
    (taskDao.default.remove as any).mockResolvedValue(1);
    (taskDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await request(app).delete('/api/tasks/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.deleted).toBe(1);
  });
});
