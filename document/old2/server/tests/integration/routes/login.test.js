const request = require('supertest');
const express = require('express');
const session = require('express-session');

jest.mock('../../../dao/userDao');
const userDao = require('../../../dao/userDao');
const loginRouter = require('../../../routes/login');

const app = express();
app.use(express.json());
app.use(session({ secret: 'test', resave: false, saveUninitialized: true }));
app.use('/', loginRouter);

describe('login routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('400: ユーザー名/パスワード未入力', async () => {
    const res = await request(app).post('/login').send({});
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('200: 認証成功', async () => {
    userDao.find.mockResolvedValue([{ username: 'user' }]);
    const res = await request(app)
      .post('/login')
      .send({ username: 'user', password: 'pass' });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('401: 認証失敗', async () => {
    userDao.find.mockResolvedValue([]);
    const res = await request(app)
      .post('/login')
      .send({ username: 'user', password: 'wrong' });
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('500: DBエラー', async () => {
    userDao.find.mockRejectedValue(new Error('db error'));
    const res = await request(app)
      .post('/login')
      .send({ username: 'user', password: 'pass' });
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });

  it('GET /logoutでリダイレクト', async () => {
    const res = await request(app).get('/logout');
    expect(res.status).toBe(302);
    expect(res.header.location).toBe('/login');
  });
});
