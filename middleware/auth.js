import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import HttpError from '../helpers/HttpError.js';

const { JWT_SECRET } = process.env;

export const authenticateToken = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw HttpError(401, 'Not authorized');
    }

    // Перевіряємо токен
    const { id } = jwt.verify(token, JWT_SECRET);
    
    // Знаходимо користувача
    const user = await User.findByPk(id);
    if (!user || user.token !== token) {
      throw HttpError(401, 'Not authorized');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(HttpError(401, 'Not authorized'));
    } else {
      next(error);
    }
  }
};
