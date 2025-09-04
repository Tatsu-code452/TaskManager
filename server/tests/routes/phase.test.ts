// phase.ts のルーティング単体テスト

import request from 'supertest';
import * as phaseDao from '../../src/dao/phaseDao';
import app from '../../src/server';

// phaseDaoをモック
jest.mock('../../src/dao/phaseDao', () => ({
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

describe('phase routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/phases: 一覧取得', async () => {
    (phaseDao.default.find as any).mockResolvedValue([{ id: 1, name: 'dummy' }]);
    const res = await request(app).get('/api/phases');
    expect(res.statusCode).toBe(200);
    expect(res.body.data[0].name).toBe('dummy');
  });

  it('GET /api/phases/:id: 詳細取得', async () => {
    (phaseDao.default.findById as any).mockResolvedValue({ id: 1, name: 'dummy' });
    const res = await request(app).get('/api/phases/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe('dummy');
  });

  it('GET /api/phases/:id: 存在しないID', async () => {
    (phaseDao.default.findById as any).mockResolvedValue(null);
    const res = await request(app).get('/api/phases/999');
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('POST /api/phases: 新規登録', async () => {
    (phaseDao.default.insert as any).mockResolvedValue({ id: 2, name: 'new' });
    (phaseDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await request(app).post('/api/phases').send({ data: { id: 2, name: 'new' } });
    expect(res.statusCode).toBe(201);
    expect(res.body.phase.name).toBe('new');
  });

  it('POST /api/phases: 必須フィールド不足', async () => {
    const res = await request(app).post('/api/phases').send({ data: { name: 'noid' } });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('PUT /api/phases/:id: 更新', async () => {
    (phaseDao.default.update as any).mockResolvedValue(1);
    (phaseDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await request(app).put('/api/phases/1').send({ data: { name: 'updated' } });
    expect(res.statusCode).toBe(200);
    expect(res.body.updated).toBe(1);
  });

  it('PUT /api/phases/:id: データなし', async () => {
    const res = await request(app).put('/api/phases/1').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('DELETE /api/phases/:id: 削除', async () => {
    (phaseDao.default.remove as any).mockResolvedValue(1);
    (phaseDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await request(app).delete('/api/phases/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.deleted).toBe(1);
  });
});
