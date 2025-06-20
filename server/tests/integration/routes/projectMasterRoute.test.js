const request = require('supertest');
const express = require('express');
const session = require('express-session');

jest.mock('../../../dao/projectMasterDao');
const projectMasterDao = require('../../../dao/projectMasterDao');
const projectMasterRouter = require('../../../routes/projectMaster');

const app = express();
app.use(express.json());
app.use(session({ secret: 'test', resave: false, saveUninitialized: true }));
app.use('/', projectMasterRouter);

describe('projectMaster routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /projects 正常', async () => {
    projectMasterDao.find.mockResolvedValue([
      { id: 1, name: 'p1', description: 'd', start_date: '2020', end_date: '2021', created_at: 'c', updated_at: 'u' }
    ]);
    const res = await request(app).get('/projects');
    expect(res.status).toBe(200);
    expect(res.body[0].name).toBe('p1');
  });

  it('GET /projects DBエラー', async () => {
    projectMasterDao.find.mockRejectedValue(new Error('db error'));
    const res = await request(app).get('/projects');
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });

  it('POST /projects 正常', async () => {
    projectMasterDao.insert.mockResolvedValue({ id: 2 });
    const res = await request(app).post('/projects').send({ data: { name: 'n', startDate: 's' } });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('POST /projects 不正データ', async () => {
    const res = await request(app).post('/projects').send({ data: null });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('POST /projects 必須フィールド不足', async () => {
    const res = await request(app).post('/projects').send({ data: { name: '' } });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('POST /projects DBエラー', async () => {
    projectMasterDao.insert.mockRejectedValue(new Error('db error'));
    const res = await request(app).post('/projects').send({ data: { name: 'n', startDate: 's' } });
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });

  it('PUT /projects/:id 正常', async () => {
    projectMasterDao.update.mockResolvedValue({ id: 3 });
    const res = await request(app).put('/projects/3').send({ data: { name: 'n', startDate: 's' } });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('PUT /projects/:id 不正データ', async () => {
    const res = await request(app).put('/projects/3').send({ data: null });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('PUT /projects/:id 必須フィールド不足', async () => {
    const res = await request(app).put('/projects/3').send({ data: { name: '' } });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('PUT /projects/:id DBエラー', async () => {
    projectMasterDao.update.mockRejectedValue(new Error('db error'));
    const res = await request(app).put('/projects/3').send({ data: { name: 'n', startDate: 's' } });
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });

  it('DELETE /projects/:id 正常', async () => {
    projectMasterDao.remove.mockResolvedValue({ id: 4 });
    const res = await request(app).delete('/projects/4');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('DELETE /projects/:id DBエラー', async () => {
    projectMasterDao.remove.mockRejectedValue(new Error('db error'));
    const res = await request(app).delete('/projects/4');
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});
