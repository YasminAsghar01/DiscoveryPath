const request = require('supertest');
const app = require('../server/index');
const http = require('http');
const mongoose = require('mongoose');

let server;

beforeAll(async () => {
  server = http.createServer(app);
  await server.listen(3003);
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

// tests requests made to API endpoint "/pathways"
describe('GET requests', () => {
  it('should respond with a json of all pathways if request successful', async () => {
    const res = await request(app).get('/pathways')
    expect(res.headers['content-type']).toEqual(expect.stringContaining('application/json'));
  });

  it('should respond with a specific pathway json if valid pathway name provided', async () => {
    const res = await request(app).get('/pathways/Pathway B')
    expect(res.headers['content-type']).toEqual(expect.stringContaining('application/json'));
    const responseBody = JSON.parse(res.text);
    expect(responseBody.name).toEqual('Pathway B');
  });

  it('should respond with an error if invalid pathway name provided', async () => {
    const res = await request(app).get('/pathways/PathwayZ')
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Pathway not found');
  });
});

describe('POST requests', () => {

  it('should respond with error if pathway exists', async () => {
    const res = await request(app)
      .post('/pathways/Pathway A')

    expect(res.statusCode).toBe(409);
    expect(res.body.error).toBe('Pathway already exists');
  });

  it('should respond with status code 200 if pathway created successfully', async () => {
    const res = await request(app)
      .post('/pathways/Pathway Jest')
      .send({
        description: 'This is Jest test pathway description',
        duration: '2 weeks',
        certification: 'Jest Basics',
        pathway_link: 'http://www.w3schools.com',
        skills_gained: ['Jest'],
      });

    expect(res.statusCode).toBe(200);
  });

  it('should respond with an error if pathway not created successfully', async () => {
    const res = await request(app)
      .post('/pathways/Pathway Jest1')
      .send({
        description1: 'This is Jest test pathway description',
        duration1: '2 weeks',
        certification1: 'Jest Basics',
        pathway_link1: 'http://www.w3schools.com',
        skills_gained1: ['Jest'],
      });
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Internal Server Error');
  });

  it('should respond with an error if valid pathway not created', async () => {
    const res = await request(app)
      .post('/pathways/Pathway Jest1')
      .send({});
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Internal Server Error');
  });

});
