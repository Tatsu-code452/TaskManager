import request from "supertest";
import * as userDao from "../../src/dao/userDao";

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

describe('user routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/users: ユーザ一覧取得', async () => {
    (userDao.default.find as any).mockResolvedValue([{ id: 1, name: 'dummy' }]);
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.data[0].name).toBe('dummy');
  });

  it('GET /api/users/:id: ユーザ詳細取得', async () => {
    (userDao.default.findById as any).mockResolvedValue({ id: 1, name: 'dummy' });
    const res = await request(app).get('/api/users/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe('dummy');
  });

  it('GET /api/users/:id: 存在しないID', async () => {
    (userDao.default.findById as any).mockResolvedValue(null);
    const res = await request(app).get('/api/users/999');
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('POST /api/users: ユーザ新規登録', async () => {
    (userDao.default.insert as any).mockResolvedValue({ id: 2, name: 'new' });
    (userDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await request(app).post('/api/users').send({ data: { id: 2, password: 'pass', name: 'new' } });
    expect(res.statusCode).toBe(201);
    expect(res.body.user.name).toBe('new');
  });

  it('POST /api/users: 必須フィールド不足', async () => {
    const res = await request(app).post('/api/users').send({ data: { name: 'noid' } });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('PUT /api/users/:id: ユーザ情報更新', async () => {
    (userDao.default.update as any).mockResolvedValue(1);
    (userDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await request(app).put('/api/users/1').send({ data: { name: 'updated' } });
    expect(res.statusCode).toBe(200);
    expect(res.body.updated).toBe(1);
  });

  it('PUT /api/users/:id: データなし', async () => {
    const res = await request(app).put('/api/users/1').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('DELETE /api/users/:id: ユーザ削除', async () => {
    (userDao.default.remove as any).mockResolvedValue(1);
    (userDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await request(app).delete('/api/users/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.deleted).toBe(1);
  });
});
