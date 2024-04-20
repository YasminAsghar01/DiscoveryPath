const request = require('supertest');
const app = require('../server/index');
const http = require('http');
const mongoose = require('mongoose');

let server;

beforeAll(async () => {
  server = http.createServer(app);
  await server.listen(3002);
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

describe('POST /login', () => {
  it('should respond with an error if no valid credentials provided', async () => {
    const res = await request(app)
      .post('/login')
      .send({});
    expect(res.statusCode).toBe(400);
  });

  it('should respond with a token if valid credentials are provided', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'emma.johnson@example.com', password: 'securepass' });

    expect(res.body.data).toBeDefined(); // Assuming your response contains a 'data' field with the token
    expect(res.body.message).toBe('Logged in successfully');

  });

  it('should respond with an error if invalid credentials are provided', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'emma1.johnson@example.com', password: 'wrongpass' });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid email');

  });

  it('should respond with an error if invalid password is provided', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'emma.johnson@example.com', password: 'wrongpass' });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid password');
  });
});
