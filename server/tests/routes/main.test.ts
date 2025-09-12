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

import request from 'supertest';
import app from '../../src/server';
import { setupTestSession } from '../utils/testSession';
import { setUserDaoMock } from '../utils/mockUserDao';

describe('main router catch-all', () => {
  let agent: any;
  let csrfToken: string;

  beforeEach(async () => {
    jest.clearAllMocks();
    setUserDaoMock();
    agent = request.agent(app);
    csrfToken = await setupTestSession(agent);
  });

  it('GET /api/ (not found) should return 404', async () => {
    const res = await agent.set('X-CSRF-Token', csrfToken).get('/api');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Not Found');
  });
  it('GET /api/unknown: 存在しないAPI', async () => {
    const res = await agent.set('X-CSRF-Token', csrfToken).get('/api/unknown');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBeDefined();
  });

  it('POST /api/ (not found)', async () => {
    const res = await agent.set('X-CSRF-Token', csrfToken).post('/api').send({});
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBeDefined();
  });
});
