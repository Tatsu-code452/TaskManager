const request = require('supertest');
const express = require('express');
const session = require('express-session');

jest.mock('../../../dao/taskPlanDao');
jest.mock('../../../dao/projectMasterDao');
jest.mock('../../../dao/phaseMasterDao');
jest.mock('../../../dao/categoryMasterDao');
jest.mock('../../../dao/userDao');

const taskPlanDao = require('../../../dao/taskPlanDao');
const projectMasterDao = require('../../../dao/projectMasterDao');
const phaseMasterDao = require('../../../dao/phaseMasterDao');
const categoryMasterDao = require('../../../dao/categoryMasterDao');
const userDao = require('../../../dao/userDao');
const taskRouter = require('../../../routes/task');

const app = express();
app.use(express.json());
app.use(session({ secret: 'test', resave: false, saveUninitialized: true }));
app.use('/', taskRouter);

describe('task routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /tasks 正常', async () => {
    taskPlanDao.find.mockResolvedValue([
      { id: 1, project_id: 1, phase_id: 1, assignee_id: 1, category_id: 1, title: 't', description: 'd', status: 's', start_date: 's', end_date: 'e', workload: 1, create_date: 'c', update_date: 'u' }
    ]);
    projectMasterDao.find.mockResolvedValue([{ id: 1, name: 'p' }]);
    phaseMasterDao.find.mockResolvedValue([{ id: 1, name: 'ph' }]);
    categoryMasterDao.find.mockResolvedValue([{ id: 1, name: 'cat' }]);
    userDao.find.mockResolvedValue([{ id: 1, username: 'u' }]);
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body[0].projectName).toBe('p');
    expect(res.body[0].phaseName).toBe('ph');
    expect(res.body[0].category).toBe('cat');
    expect(res.body[0].assignee).toBe('u');
  });

  it('GET /tasks DBエラー', async () => {
    taskPlanDao.find.mockRejectedValue(new Error('db error'));
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });

  it('POST /tasks 正常', async () => {
    taskPlanDao.insert.mockResolvedValue({ id: 2, title: 't', description: 'd' });
    const res = await request(app).post('/tasks').send({ title: 't', description: 'd' });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('POST /tasks 入力不足', async () => {
    const res = await request(app).post('/tasks').send({ title: '' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('POST /tasks DBエラー', async () => {
    taskPlanDao.insert.mockRejectedValue(new Error('db error'));
    const res = await request(app).post('/tasks').send({ title: 't', description: 'd' });
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});
