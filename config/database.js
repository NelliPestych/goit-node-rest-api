import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET = 'your-secret-key' } = process.env;

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'dpg-d2q09bv5r7bs73a5dt50-a.oregon-postgres.render.com',
  port: 5432,
  database: 'db_contacts_a5uo',
  username: 'db_contacts_a5uo_user',
  password: 'uOAcg710tEA2JHTF2GueOUeTYD1qEYUu',
  logging: false, // отключаем логи SQL запросов
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

export default sequelize;
