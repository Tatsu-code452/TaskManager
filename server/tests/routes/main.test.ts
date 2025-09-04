
import request from 'supertest';
import app from '../../src/server';


describe('main router catch-all', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/ (not found) should return 404', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Not Found');
  });
    it('GET /api/unknown: 存在しないAPI', async () => {
      const res = await request(app).get('/api/unknown');
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBeDefined();
    });

    it('POST /api/ (not found)', async () => {
      const res = await request(app).post('/api').send({});
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBeDefined();
    });
});
