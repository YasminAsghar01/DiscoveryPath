const request = require('supertest');
const app = require('../server/index');
const http = require('http');
const mongoose = require('mongoose');

let server;

beforeAll(async () => {
  server = http.createServer(app);
  await server.listen(3005);
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

describe('GET requests', () => {
  it('should respond with an error if employee id is not valid when suggesting projects', async () => {
    const res = await request(app).get('/suggestions/projects/1455701')
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Employee not found');
  });

  it('should respond with a json of suggested projects if request successful', async () => {
    const res = await request(app).get('/suggestions/projects/1445701')
    expect(res.headers['content-type']).toEqual(expect.stringContaining('application/json'));
    expect(res.body).toHaveLength(4);
    const responseBody = JSON.parse(res.text);
    responseBody.forEach(obj => {
      expect(obj.hasOwnProperty('openRoles')).toBe(true)
      expect(Array.isArray(obj.openRoles)).toBe(true)
    });
  });

  it('should respond with an error if employee id is not valid when suggesting pathways', async () => {
    const res = await request(app).get('/suggestions/pathways/1455701')
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Employee not found');
  });

  it('should respond with a json of suggested pathways if request successful', async () => {
    const res = await request(app).get('/suggestions/pathways/1445701')
    expect(res.headers['content-type']).toEqual(expect.stringContaining('application/json'));
    expect(res.body).toHaveLength(4);
  });

});
