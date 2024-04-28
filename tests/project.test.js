const request = require('supertest');
const app = require('../server/index');
const http = require('http');
const mongoose = require('mongoose');

let server;

beforeAll(async () => {
  server = http.createServer(app);
  await server.listen(3004);
  await mongoose.connect('mongodb://localhost:27017/discoverypath', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await new Promise(resolve => server.close(resolve));
});

// tests requests made to API endpoint "/projects"
describe('GET requests', () => {
  it('should respond with a json of all project if request successful', async () => {
    const res = await request(app).get('/projects')
    expect(res.headers['content-type']).toEqual(expect.stringContaining('application/json'));
  });

  it('should respond with a specific project json if valid project name provided', async () => {
    const res = await request(app).get('/projects/Project B')
    expect(res.headers['content-type']).toEqual(expect.stringContaining('application/json'));
    const responseBody = JSON.parse(res.text);
    expect(responseBody.name).toEqual('Project B');
  });

  it('should respond with an error if invalid project name provided', async () => {
    const res = await request(app).get('/projects/ProjectZ')
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Project not found');
  });
});

describe('POST requests', () => {
  it('should respond with status code 200 if updating existing project field', async () => {
    const res = await request(app)
      .post('/projects/Project A')
      .send({ employee_id: '1445703' });

    expect(res.statusCode).toBe(200);
  });

  it('should respond with error if project exists', async () => {
    const res = await request(app)
      .post('/projects/Project A')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Project already exists and No fields to update');
  });

  it('should respond with status code 200 if project created successfully', async () => {
    const res = await request(app)
      .post('/projects/Project Jest')
      .send({
        description: 'This is Jest test description',
        start_date: '2024-04-16',
        end_date: '2024-04-17',
        project_lead: '144701',
        technologies: ['Jest'],
        team_members: ['144704'],
      });

    expect(res.statusCode).toBe(200);
  });

  it('should respond with an error if project not created successfully', async () => {
    const res = await request(app)
      .post('/projects/Project Jest1')
      .send({
        description1: 'This is Jest test description',
        start_date1: '2024-04-16',
        end_date1: '2024-04-17',
        project_lead1: '144701',
        technologies1: ['Jest'],
        team_members1: ['144704'],
      });

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Internal Server Error');
  });

  it('should respond with an error if valid project not created', async () => {
    const res = await request(app)
      .post('/projects/Project Jest2')
      .send({});
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Internal Server Error');
  });
});
