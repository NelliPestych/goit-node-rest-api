# REST API для работы с контактами

Этот проект представляет собой REST API для управления контактами с использованием Node.js, Express, PostgreSQL и Sequelize.

## Требования

- Node.js (LTS версия)
- PostgreSQL
- pgAdmin или DBeaver для работы с базой данных

## Установка и настройка

### 1. Клонирование репозитория
```bash
git clone <your-repo-url>
cd goit-node-rest-api
git checkout 03-postgresql
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Настройка базы данных

#### Создание базы данных на Render:
1. Зарегистрируйтесь на [Render](https://render.com)
2. Создайте новую PostgreSQL базу данных с именем `db-contacts`
3. Запишите данные для подключения (host, port, database, username, password)

#### Локальная настройка PostgreSQL:
1. Установите PostgreSQL на вашу машину
2. Создайте базу данных:
```sql
CREATE DATABASE "db-contacts";
```

### 4. Настройка подключения к базе данных

Отредактируйте файл `config/database.js` и замените параметры подключения на ваши:

```javascript
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'your_host',           // например: 'localhost' или хост от Render
  port: 5432,                   // порт PostgreSQL
  database: 'db-contacts',      // имя базы данных
  username: 'your_username',    // ваше имя пользователя
  password: 'your_password',    // ваш пароль
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
```

### 5. Установка pgAdmin (опционально)
Для удобной работы с базой данных установите pgAdmin:
- [pgAdmin для Windows](https://www.pgadmin.org/download/pgadmin-4-windows/)
- [pgAdmin для macOS](https://www.pgadmin.org/download/pgadmin-4-macos/)
- [pgAdmin для Linux](https://www.pgadmin.org/download/pgadmin-4-linux/)

## Запуск проекта

### Режим разработки
```bash
npm run dev
```

### Продакшн режим
```bash
npm start
```

При успешном запуске вы увидите сообщения:
- "Database connection successful"
- "Database synchronized successfully"
- "Server is running. Use our API on port: 3000"

## API Endpoints

### Контакты

- `GET /api/contacts` - получить все контакты
- `GET /api/contacts/:id` - получить контакт по ID
- `POST /api/contacts` - создать новый контакт
- `PUT /api/contacts/:id` - обновить контакт
- `DELETE /api/contacts/:id` - удалить контакт
- `PATCH /api/contacts/:contactId/favorite` - обновить статус favorite

### Структура контакта

```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "phone": "string",
  "favorite": "boolean",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## Примеры использования

### Создание контакта
```bash
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "phone": "+1234567890"}'
```

### Обновление статуса favorite
```bash
curl -X PATCH http://localhost:3000/api/contacts/1/favorite \
  -H "Content-Type: application/json" \
  -d '{"favorite": true}'
```

## Технологии

- **Backend**: Node.js, Express
- **База данных**: PostgreSQL
- **ORM**: Sequelize
- **Валидация**: Joi
- **Логирование**: Morgan

## Структура проекта

```
├── config/
│   ├── database.js      # Конфигурация базы данных
│   └── initDB.js        # Инициализация БД
├── controllers/
│   └── contactsControllers.js
├── models/
│   └── Contact.js       # Модель Sequelize
├── routes/
│   └── contactsRouter.js
├── schemas/
│   └── contactsSchemas.js
├── services/
│   └── contactsServices.js
├── app.js               # Главный файл приложения
└── package.json
```

## Устранение неполадок

### Ошибка подключения к базе данных
1. Проверьте правильность параметров подключения в `config/database.js`
2. Убедитесь, что PostgreSQL сервер запущен
3. Проверьте, что база данных существует
4. Убедитесь, что пользователь имеет права доступа к базе данных

### Ошибка синхронизации моделей
1. Проверьте права пользователя на создание/изменение таблиц
2. Убедитесь, что в базе данных нет конфликтующих таблиц

## Лицензия

MIT