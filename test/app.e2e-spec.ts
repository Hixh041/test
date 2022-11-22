import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token;
  let tokenManager;
  let token2;
  let task;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/login (POST) Manager', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(
        {
          "username": "admin",
          "password": "admin"
        }
      )
      .expect(201);

    tokenManager = res.body.access_token;
    return res;
  });

  it('/login (POST) Technician A', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(
        {
          "username": "user",
          "password": "user"
        }
      )
      .expect(201);

    token = res.body.access_token;
    return res;
  });

  it('/login (POST) Technician B', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(
        {
          "username": "user1",
          "password": "user1"
        }
      )
      .expect(201);

    token2 = res.body.access_token;
    return res;
  });

  it('/taks (GET) task of Technician A must be 0', async () => {
    const res = await request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.length).toEqual(0);
    return res;
  });

  it('/taks (POST) Technician A must be able to created his task', async () => {
    const res = await request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send(
        {
          "summary": "bla bla",
          "date": "01/02/2023",
          "completed": false,
          "Isworking": true
        }
      )
      .expect(201);

    expect(res.body.summary).toEqual('bla bla');
    task = res.body;
    return res;
  });

  it('/taks (GET) task of Technician A must be 1', async () => {
    const res = await request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.length).toEqual(1);
    return res;
  });

  it('/taks (PUT) Technician A must be able to updated his task', async () => {
    const res = await request(app.getHttpServer())
      .put(`/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(
        {
          "summary": "bla update",
          "completed": true,
          "Isworking": false
        }
      )
      .expect(200);

    expect(res.body.summary).toEqual('bla update');
    return res;
  });

  it('/taks (DELETE) Technician A must not be able to delete his task', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(403);
    return res;
  });

  it('/taks (PUT) Technician B must not be able to updated a task of Technician A', async () => {
    const res = await request(app.getHttpServer())
      .put(`/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token2}`)
      .send(
        {
          "summary": "bla update",
          "completed": true,
          "Isworking": false
        }
      )
      .expect(404);

    return res;
  });

  it('/taks (GET) task of Technician B must be 0', async () => {
    const res = await request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${token2}`)
      .expect(200);

    expect(res.body.length).toEqual(0);
    return res;
  });

  it('/taks (DELETE) Manager must be able to delete a Technician A task', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/tasks/${task.id}`)
      .set('Authorization', `Bearer ${tokenManager}`)
      .expect(200);
    return res;
  });

  it('/taks (GET) task of Technician A must be 0', async () => {
    const res = await request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.length).toEqual(0);
    return res;
  });
});
