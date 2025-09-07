import express from 'express';
import {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
} from '../controllers/authControllers.js';
import validateBody from '../helpers/validateBody.js';
import { authenticateToken } from '../middleware/auth.js';
import { registerSchema, loginSchema, updateSubscriptionSchema } from '../schemas/authSchemas.js';

const authRouter = express.Router();

authRouter.post('/register', validateBody(registerSchema), register);
authRouter.post('/login', validateBody(loginSchema), login);
authRouter.post('/logout', authenticateToken, logout);
authRouter.get('/current', authenticateToken, getCurrent);
authRouter.patch('/subscription', authenticateToken, validateBody(updateSubscriptionSchema), updateSubscription);

export default authRouter;
