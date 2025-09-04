// status.ts のルーティング単体テスト

import request from 'supertest';
import * as statusDao from '../../src/dao/statusDao';
import app from '../../src/server';

// statusDaoをモック
jest.mock('../../src/dao/statusDao', () => ({
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

describe('status routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/statuses: 一覧取得', async () => {
    (statusDao.default.find as any).mockResolvedValue([{ id: 1, name: 'dummy' }]);
    const res = await request(app).get('/api/statuses');
    expect(res.statusCode).toBe(200);
    expect(res.body.data[0].name).toBe('dummy');
  });

  it('GET /api/statuses/:id: 詳細取得', async () => {
    (statusDao.default.findById as any).mockResolvedValue({ id: 1, name: 'dummy' });
    const res = await request(app).get('/api/statuses/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe('dummy');
  });

  it('GET /api/statuses/:id: 存在しないID', async () => {
    (statusDao.default.findById as any).mockResolvedValue(null);
    const res = await request(app).get('/api/statuses/999');
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('POST /api/statuses: 新規登録', async () => {
    (statusDao.default.insert as any).mockResolvedValue({ id: 2, name: 'new' });
    (statusDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await request(app).post('/api/statuses').send({ data: { id: 2, name: 'new' } });
    expect(res.statusCode).toBe(201);
    expect(res.body.status.name).toBe('new');
  });

  it('POST /api/statuses: 必須フィールド不足', async () => {
    const res = await request(app).post('/api/statuses').send({ data: { name: 'noid' } });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('PUT /api/statuses/:id: 更新', async () => {
    (statusDao.default.update as any).mockResolvedValue(1);
    (statusDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await request(app).put('/api/statuses/1').send({ data: { name: 'updated' } });
    expect(res.statusCode).toBe(200);
    expect(res.body.updated).toBe(1);
  });

  it('PUT /api/statuses/:id: データなし', async () => {
    const res = await request(app).put('/api/statuses/1').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('DELETE /api/statuses/:id: 削除', async () => {
    (statusDao.default.remove as any).mockResolvedValue(1);
    (statusDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await request(app).delete('/api/statuses/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.deleted).toBe(1);
  });
});
