import initDatabase from './config/initDB.js';

console.log('Тестирование подключения к базе данных...');

try {
  await initDatabase();
  console.log('✅ Подключение к базе данных успешно!');
  process.exit(0);
} catch (error) {
  console.error('❌ Ошибка подключения к базе данных:', error.message);
  process.exit(1);
}
