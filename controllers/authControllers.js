import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import HttpError from '../helpers/HttpError.js';

const { JWT_SECRET } = process.env;

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Перевіряємо чи користувач вже існує
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw HttpError(409, 'Email in use');
    }

    // Хешуємо пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створюємо користувача
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Знаходимо користувача
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw HttpError(401, 'Email or password is wrong');
    }

    // Перевіряємо пароль
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw HttpError(401, 'Email or password is wrong');
    }

    // Генеруємо токен
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });

    // Зберігаємо токен в базі
    await user.update({ token });

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { id } = req.user;
    
    await User.update({ token: null }, { where: { id } });
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    
    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { subscription } = req.body;
    
    const user = await User.findByPk(id);
    if (!user) {
      throw HttpError(404, 'User not found');
    }
    
    await user.update({ subscription });
    
    res.json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};
