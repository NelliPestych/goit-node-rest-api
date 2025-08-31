# Настройка базы данных PostgreSQL на Render

## Шаг 1: Регистрация на Render

1. Перейдите на [Render](https://render.com)
2. Нажмите "Get Started" и зарегистрируйтесь
3. Подтвердите email адрес

## Шаг 2: Создание PostgreSQL базы данных

1. В панели управления нажмите "New +"
2. Выберите "PostgreSQL"
3. Настройте параметры:
   - **Name**: `db-contacts`
   - **Database**: `db-contacts`
   - **User**: оставьте по умолчанию или создайте свой
   - **Region**: выберите ближайший к вам регион
   - **PostgreSQL Version**: выберите последнюю стабильную версию
   - **Plan**: выберите бесплатный план (Free)

4. Нажмите "Create Database"

## Шаг 3: Получение данных для подключения

После создания базы данных:

1. Перейдите в созданную базу данных
2. В разделе "Connections" найдите:
   - **Host**: `your-db-name.render.com`
   - **Port**: `5432`
   - **Database**: `db-contacts`
   - **User**: ваше имя пользователя
   - **Password**: ваш пароль
   - **External Database URL**: полная строка подключения

## Шаг 4: Настройка проекта

1. Откройте файл `config/database.js`
2. Замените параметры подключения на полученные от Render:

```javascript
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'your-db-name.render.com',     // хост от Render
  port: 5432,                          // порт PostgreSQL
  database: 'db-contacts',             // имя базы данных
  username: 'your_username',           // имя пользователя от Render
  password: 'your_password',           // пароль от Render
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
```

## Шаг 5: Тестирование подключения

1. Запустите тест подключения:
```bash
node test-db.js
```

2. При успешном подключении вы увидите:
```
Тестирование подключения к базе данных...
Database connection successful
Database synchronized successfully
✅ Подключение к базе данных успешно!
```

## Шаг 6: Запуск основного приложения

```bash
npm run dev
```

## Важные замечания

- **Бесплатный план Render**: база данных будет "засыпать" после 90 дней неактивности
- **Безопасность**: не коммитьте реальные пароли в git
- **SSL**: Render автоматически настраивает SSL соединения
- **Ограничения**: бесплатный план имеет ограничения на количество соединений

## Устранение неполадок

### Ошибка "Connection refused"
- Проверьте правильность хоста и порта
- Убедитесь, что база данных активна в Render

### Ошибка "Authentication failed"
- Проверьте правильность username и password
- Убедитесь, что пользователь имеет права доступа

### Ошибка "Database does not exist"
- Проверьте правильность имени базы данных
- Убедитесь, что база данных создана в Render
