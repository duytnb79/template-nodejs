import request from 'supertest';
import app from '../../../src/app';
import { prisma } from '../../../src/config/prisma';

describe('UserController', () => {
  describe('create a user', () => {
    const user = {
      name: 'user1',
      email: 'user1@email.com',
      password: 'hashed_password',
    };
    it('should return 201 and the user created', async () => {
      const response = await request(app).post('/api/v1/users').send(user);

      expect(response.status).toBe(201);
      expect(response.body.data.name).toEqual(user.name);
    });
  });

  describe('get all users', () => {
    it('should return 200 and all users', async () => {
      const response = await request(app).get('/api/v1/users');

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('get a user', () => {
    it('should return users for valid ID ', async () => {
      const user = await prisma.users.findFirst();
      const response = await request(app).get(`/api/v1/users/${user?.id}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual({
        id: user?.id,
        name: user?.name,
        email: user?.email,
      });
    });
  });

  describe('update a task', () => {
    it('should return 404 if the user with the id does not exist', async () => {
      const id = '12345';
      const response = await request(app)
        .patch(`/api/v1/users/${id}`)
        .send({ name: 'updated' });

      expect(response.status).toBe(404);
    });

    it('should return 200 and the user updated', async () => {
      const user = await prisma.users.findFirst();
      const response = await request(app)
        .patch(`/api/v1/users/${user?.id}`)
        .send({ name: 'updated' });

      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe('updated');
    });
  });

  describe('delete a user', () => {
    it('should return 404 if the user with the id does not exist', async () => {
      const id = '12345';
      const response = await request(app).delete(`/api/v1/users/${id}`);

      expect(response.status).toBe(404);
    });

    it('should return 204', async () => {
      let user = await prisma.users.findFirst();
      const response = await request(app).delete(`/api/v1/users/${user?.id}`);

      expect(response.status).toBe(204);
    });
  });
});
