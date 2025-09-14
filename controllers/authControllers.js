import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';
import HttpError from '../helpers/HttpError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

    // Генеруємо аватар за допомогою gravatar
    const avatarURL = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'identicon'
    });

    // Створюємо користувача
    const user = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
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
        avatarURL: user.avatarURL,
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
    const { email, subscription, avatarURL } = req.user;
    
    res.json({
      email,
      subscription,
      avatarURL,
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
      avatarURL: user.avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    const { id } = req.user;
    
    if (!req.file) {
      throw HttpError(400, 'No file uploaded');
    }

    const user = await User.findByPk(id);
    if (!user) {
      throw HttpError(404, 'User not found');
    }

    // Створюємо унікальне ім'я файлу
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(req.file.originalname);
    const fileName = `avatar-${id}-${uniqueSuffix}${fileExtension}`;
    
    // Шляхи до файлів
    const tempPath = req.file.path;
    const publicPath = path.join(__dirname, '..', 'public', 'avatars', fileName);
    
    // Переносимо файл з temp в public/avatars
    await fs.rename(tempPath, publicPath);
    
    // Оновлюємо avatarURL в базі даних
    const avatarURL = `/avatars/${fileName}`;
    await user.update({ avatarURL });
    
    res.json({
      avatarURL: avatarURL,
    });
  } catch (error) {
    // Видаляємо тимчасовий файл у випадку помилки
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting temp file:', unlinkError);
      }
    }
    next(error);
  }
};
