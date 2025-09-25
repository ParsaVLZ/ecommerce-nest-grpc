import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { UsersModule } from 'src/modules/users/user.module';
import { UserEntity } from 'src/modules/users/entities/user.entity';

describe('Users (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [UserEntity],
          synchronize: true,
          dropSchema: true, 
          retryAttempts: 1,
          retryDelay: 0,
        }),
        UsersModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /users → 201 creates a user', async () => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Parsa', email: 'parsavalizadeh@yahoo.com' })
      .expect(201);

    expect(res.body).toMatchObject({
      id: expect.any(Number),
      name: 'Parsa',
      email: 'parsavalizadeh@yahoo.com',
    });
  });

  it('POST /users (duplicate) → 409', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Francesco', email: 'parsavalizadeh@yahoo.com' })
      .expect(409);
  });

  it('POST /users → 400 when email missing', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'unknown-user' })
      .expect(400);
  });

  it('GET /users → 200 paginated list', async () => {
    const res = await request(app.getHttpServer())
      .get('/users?page=1&limit=10')
      .expect(200);

    expect(res.body).toMatchObject({
      users: expect.any(Array),
      pagination: {
        totalItems: expect.any(Number),
        page: 1,
        limit: 10,
        totalPages: expect.any(Number),
      },
    });
    expect(res.body.users.length).toBeGreaterThanOrEqual(1);
  });

  it('GET /users/:id → 200 returns user', async () => {
    const create = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Andrea', email: 'andrea@gmail.com' })
      .expect(201);

    const res = await request(app.getHttpServer())
      .get(`/users/${create.body.id}`)
      .expect(200);

    expect(res.body).toMatchObject({ id: create.body.id, name: 'Andrea', email: 'andrea@gmail.com' });
  });

  it('PUT /users/:id → 200 updates user', async () => {
    const create = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Davide', email: 'davide@yahoo.com' })
      .expect(201);

    const res = await request(app.getHttpServer())
      .put(`/users/${create.body.id}`)
      .send({ name: 'Marco' })
      .expect(200);

    expect(res.body).toMatchObject({ id: create.body.id, name: 'Marco', email: 'davide@yahoo.com' });
  });

  it('DELETE /users/:id → 200 then GET → 404', async () => {
    const create = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'ToDelete', email: 'todelete@example.com' })
      .expect(201);

    await request(app.getHttpServer()).delete(`/users/${create.body.id}`).expect(200);
    await request(app.getHttpServer()).get(`/users/${create.body.id}`).expect(404);
  });
});
