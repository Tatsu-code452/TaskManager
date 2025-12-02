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
// phase.ts のルーティング単体テスト

import request from 'supertest';
import * as phaseDao from '../../src/dao/phase.dao';
import app from '../../src/server';
import { setupTestSession } from '../utils/testSession';
import { setUserDaoMock } from '../utils/mockUserDao';

// phaseDaoをモック
jest.mock('../../src/dao/phase.dao', () => ({
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
  let agent: any;
  let csrfToken: string;

  beforeEach(async () => {
    jest.clearAllMocks();
    setUserDaoMock();
    agent = request.agent(app);
    csrfToken = await setupTestSession(agent);
  });

  it('GET /api/phases: 一覧取得', async () => {
    (phaseDao.default.find as any).mockResolvedValue([{ id: 1, name: 'dummy' }]);
    const res = await agent.get('/api/phases').set('X-CSRF-Token', csrfToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.data[0].name).toBe('dummy');
  });

  it('GET /api/phases/:id: 詳細取得', async () => {
    (phaseDao.default.findById as any).mockResolvedValue({ id: 1, name: 'dummy' });
    const res = await agent.get('/api/phases/1').set('X-CSRF-Token', csrfToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe('dummy');
  });

  it('GET /api/phases/:id: 存在しないID', async () => {
    (phaseDao.default.findById as any).mockResolvedValue(null);
    const res = await agent.get('/api/phases/999').set('X-CSRF-Token', csrfToken);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('POST /api/phases: 新規登録', async () => {
    (phaseDao.default.insert as any).mockResolvedValue({ id: 2, name: 'new' });
    (phaseDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await agent.post('/api/phases')
      .set('X-CSRF-Token', csrfToken)
      .send({ data: { id: 2, name: 'new' } });
    expect(res.statusCode).toBe(201);
    expect(res.body.phase.name).toBe('new');
  });

  it('POST /api/phases: 必須フィールド不足', async () => {
    const res = await agent.post('/api/phases')
      .set('X-CSRF-Token', csrfToken)
      .send({ data: { name: 'noid' } });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('PUT /api/phases/:id: 更新', async () => {
    (phaseDao.default.update as any).mockResolvedValue(1);
    (phaseDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await agent.set('X-CSRF-Token', csrfToken)
      .put('/api/phases/1').send({ data: { name: 'updated' } });
    expect(res.statusCode).toBe(200);
    expect(res.body.updated).toBe(1);
  });

  it('PUT /api/phases/:id: データなし', async () => {
    const res = await agent.set('X-CSRF-Token', csrfToken)
      .put('/api/phases/1').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('DELETE /api/phases/:id: 削除', async () => {
    (phaseDao.default.remove as any).mockResolvedValue(1);
    (phaseDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
    const res = await agent.set('X-CSRF-Token', csrfToken)
      .delete('/api/phases/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.deleted).toBe(1);
  });
});
