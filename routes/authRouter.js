import express from 'express';
import {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
} from '../controllers/authControllers.js';
import validateBody from '../helpers/validateBody.js';
import { authenticateToken } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import { registerSchema, loginSchema, updateSubscriptionSchema } from '../schemas/authSchemas.js';

const authRouter = express.Router();

authRouter.post('/register', validateBody(registerSchema), register);
authRouter.post('/login', validateBody(loginSchema), login);
authRouter.post('/logout', authenticateToken, logout);
authRouter.get('/current', authenticateToken, getCurrent);
authRouter.patch('/subscription', authenticateToken, validateBody(updateSubscriptionSchema), updateSubscription);
authRouter.patch('/avatars', authenticateToken, upload.single('avatar'), updateAvatar);

export default authRouter;
