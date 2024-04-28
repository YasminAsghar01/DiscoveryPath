const request = require('supertest');
const app = require('../server/index');
const http = require('http');
const mongoose = require('mongoose');

let server;

beforeAll(async () => {
  server = http.createServer(app);
  await server.listen(3006);
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

// tests requests made to API endpoint "/profiles"
describe('GET requests', () => {
  it('should respond with a json of all profiles if request successful', async () => {
    const res = await request(app).get('/profiles')
    expect(res.headers['content-type']).toEqual(expect.stringContaining('application/json'));
  });

  it('should respond with a specific profile json if valid employee id provided', async () => {
    const res = await request(app).get('/profiles/1445701')
    expect(res.headers['content-type']).toEqual(expect.stringContaining('application/json'));
    const responseBody = JSON.parse(res.text);
    expect(responseBody.employee_id).toEqual('1445701');
  });

  it('should respond with an error if invalid employee id provided', async () => {
    const res = await request(app).get('/profiles/1455701')
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Employee not found');
  });
});

describe('POST user skills requests', () => {
  it('should respond with an error if adding skill with invalid employee id', async () => {
    const res = await request(app)
      .post('/profiles/1455701/skills')
      .send({ name: 'Jest', level: 'Beginner' });
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Employee not found');
  });

  it('should respond with an error if adding existing skill', async () => {
    const res = await request(app)
      .post('/profiles/1445701/skills')
      .send({ name: 'Python', level: 'Beginner' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Skill already exists and no fields to update');
  });

  it('should respond with status code 200 if updating existing skill', async () => {
    const res = await request(app)
      .post('/profiles/1445701/skills')
      .send({ name: 'Python', level: 'Advanced' });
    expect(res.statusCode).toBe(200);
  });

  it('should respond with status code 200 if adding new skill successfully', async () => {
    const res = await request(app)
      .post('/profiles/1445701/skills')
      .send({ name: 'Jest', level: 'Beginner' });
    expect(res.statusCode).toBe(200);
  });

  it('should respond with an error if sending empty request when adding new skill ', async () => {
    const res = await request(app)
      .post('/profiles/1445701/skills')
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Request body cannot be empty');
  });

});

describe('POST user experience requests', () => {
  it('should respond with an error if adding project experience with invalid employee id', async () => {
    const res = await request(app)
      .post('/profiles/1455701/experience')
      .send({ name: 'Jest project', role: 'Tester', skills: ['Jest'], date: "2022-11-17" });
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Employee not found');
  });

  it('should respond with status code 200 if adding new experience successfully', async () => {
    const res = await request(app)
      .post('/profiles/1445701/experience')
      .send({ name: 'Jest project', role: 'Tester', skills: ['Jest'], date: "2022-11-17" });
    expect(res.statusCode).toBe(200);
  });

});

describe('POST favouriting requests', () => {
  it('should respond with an error if favouriting project with invalid employee id', async () => {
    const res = await request(app)
      .post('/profiles/1455701/favouriteProject')
      .send({ name: 'Project A' });
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Employee not found');
  });

  it('should respond with status code 200 if favouriting project successfully', async () => {
    const res = await request(app)
      .post('/profiles/1445701/favouriteProject')
      .send({ name: 'Project A' });
    expect(res.statusCode).toBe(200);
  });

  it('should respond with an error if favouriting pathway with invalid employee id', async () => {
    const res = await request(app)
      .post('/profiles/1455701/favouritePathway')
      .send({ name: 'Project A' });
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Employee not found');
  });

  it('should respond with status code 200 if favouriting pathway successfully', async () => {
    const res = await request(app)
      .post('/profiles/1445701/favouritePathway')
      .send({ name: 'Project A' });
    expect(res.statusCode).toBe(200);
  });
});

describe('DELETE favouriting requests', () => {
  it('should respond with an error if deleting favourite project with invalid employee id', async () => {
    const res = await request(app)
      .delete('/profiles/1455701/favouriteProject/Project A')
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Employee not found');
  });

  it('should respond with status code 200 if deleting project successfully', async () => {
    const res = await request(app)
      .delete('/profiles/1445701/favouriteProject/Project A')
    expect(res.statusCode).toBe(200);
  });

  it('should respond with an error if deleting project that doesnt exist', async () => {
    const res = await request(app)
      .delete('/profiles/1445701/favouriteProject/Project Z')
    expect(res.statusCode).toBe(401);
  });

  it('should respond with an error if deleting project unsuccessfully', async () => {
    const res = await request(app)
      .delete('/profiles/1445701/favouriteProject')
    expect(res.statusCode).toBe(404);
  });

  it('should respond with an error if deleting favourite pathway with invalid employee id', async () => {
    const res = await request(app)
      .delete('/profiles/1455701/favouritePathway/Pathway C')
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Employee not found');
  });

  it('should respond with status code 200 if deleting pathway successfully', async () => {
    const res = await request(app)
      .delete('/profiles/1445701/favouritePathway/Pathway C')
    expect(res.statusCode).toBe(200);
  });

  it('should respond with an error if deleting pathway that doesnt exist', async () => {
    const res = await request(app)
      .delete('/profiles/1445701/favouritePathway/Pathway Z')
    expect(res.statusCode).toBe(401);
  });

  it('should respond with an error if deleting pathway unsuccessfully', async () => {
    const res = await request(app)
      .delete('/profiles/1445701/favouritePathway')
    expect(res.statusCode).toBe(404);
  });
});
