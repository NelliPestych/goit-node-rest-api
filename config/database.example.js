import { Sequelize } from 'sequelize';

// Пример конфигурации для локальной разработки
// Скопируйте этот файл в database.js и настройте под вашу среду

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',           // или хост от Render
  port: 5432,                  // порт PostgreSQL
  database: 'db-contacts',     // имя базы данных
  username: 'postgres',        // ваше имя пользователя (по умолчанию 'postgres')
  password: 'your_password',   // ваш пароль
  logging: false,              // отключаем логи SQL запросов
  pool: {
    max: 5,                    // максимальное количество соединений
    min: 0,                    // минимальное количество соединений
    acquire: 30000,            // время ожидания получения соединения
    idle: 10000                // время неактивности соединения
  }
});

export default sequelize;
