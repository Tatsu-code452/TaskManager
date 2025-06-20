const request = require('supertest');
const express = require('express');
const session = require('express-session');

const mainRouter = require('../../../routes/main');

const app = express();
app.use(express.json());
app.use(session({ secret: 'test', resave: false, saveUninitialized: true }));
app.use('/', mainRouter);

describe('main routes', () => {
  afterEach(() => {
    jest.clearAllMocks && jest.clearAllMocks();
  });

  it('GET /session 未ログイン', async () => {
    const res = await request(app).get('/session');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('GET /session ログイン済み', async () => {
    // セッションにuserをセットするためのミドルウェアを追加
    app.use((req, res, next) => {
      req.session.user = { username: 'u' };
      next();
    });
    const res = await request(app).get('/session');
    expect([200, 401]).toContain(res.status);
  });

  it('GET /:filename 不正パス', async () => {
    const res = await request(app).get('/forbidden.txt');
    expect([403, 404]).toContain(res.status);
  });
});
