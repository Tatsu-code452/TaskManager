import request from 'supertest';
import app from '../../src/server';

export async function setupTestSession(agent: any, user = { id: 1, name: 'test', password: 'test' }) {
  const sessionRes = await agent.get('/api/session');
  await agent.post('/api/login')
    .set('X-CSRF-Token', sessionRes.body.csrfToken)
    .send({ username: user.name, password: user.password });
  const res = await agent.get('/api/session');
  return res.body.csrfToken;
}
