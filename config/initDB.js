import sequelize from './database.js';
import Contact from '../models/Contact.js';
import User from '../models/User.js';

export async function initDatabase() {
  try {
    // Тестируем подключение к базе данных
    await sequelize.authenticate();
    console.log('Database connection successful');
    
    // Синхронизируем модели с базой данных
    // force: true - пересоздает таблицы (используйте только для разработки!)
    // alter: true - обновляет существующие таблицы
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully');
    
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
}

export default initDatabase;
