import request from 'supertest';
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { login } from '../../controllers/authControllers.js';
import User from '../../models/User.js';
import HttpError from '../../helpers/HttpError.js';

// Mock the database models
jest.mock('../../models/User.js');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const app = express();
app.use(express.json());
app.post('/login', login);

describe('Auth Controller - Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 status code and token with user data for valid credentials', async () => {
    // Arrange
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
      subscription: 'starter',
      avatarURL: 'https://gravatar.com/avatar/test'
    };

    const mockToken = 'mock-jwt-token';

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue(mockToken);
    User.prototype.update = jest.fn().mockResolvedValue();

    // Act
    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token', mockToken);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('email', 'test@example.com');
    expect(response.body.user).toHaveProperty('subscription', 'starter');
    expect(typeof response.body.user.email).toBe('string');
    expect(typeof response.body.user.subscription).toBe('string');
  });

  it('should return 401 for invalid email', async () => {
    // Arrange
    User.findOne.mockResolvedValue(null);

    // Act
    const response = await request(app)
      .post('/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'password123'
      });

    // Assert
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Email or password is wrong');
  });

  it('should return 401 for invalid password', async () => {
    // Arrange
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
      subscription: 'starter'
    };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    // Act
    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword'
      });

    // Assert
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Email or password is wrong');
  });

  it('should handle database errors', async () => {
    // Arrange
    User.findOne.mockRejectedValue(new Error('Database error'));

    // Act
    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    // Assert
    expect(response.status).toBe(500);
  });
});
