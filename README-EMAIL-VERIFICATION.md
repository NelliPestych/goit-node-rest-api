# Email Verification Setup

## Налаштування верифікації email

### 1. Налаштування змінних середовища

Додайте наступні змінні до вашого `.env` файлу:

```env
# Email verification
UKR_NET_EMAIL=your_email@ukr.net
UKR_NET_PASSWORD=your_app_password
BASE_URL=http://localhost:3000
```

### 2. Налаштування ukr.net

1. Увійдіть в свій акаунт ukr.net
2. Перейдіть в налаштування безпеки
3. Увімкніть двофакторну аутентифікацію
4. Створіть пароль додатку для SMTP
5. Використовуйте цей пароль як `UKR_NET_PASSWORD`

### 3. Оновлення бази даних

Виконайте міграцію для додавання полів верифікації:

```sql
-- Виконайте цей скрипт в pgAdmin або DBeaver
\i db/add_verification_fields.sql
```

### 4. API Endpoints

#### Реєстрація користувача
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Після реєстрації користувач отримає email з посиланням для верифікації.

#### Верифікація email
```
GET /api/auth/verify/:verificationToken
```

#### Повторна відправка email верифікації
```
POST /api/auth/verify
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### 5. Процес верифікації

1. Користувач реєструється
2. Система генерує `verificationToken` та відправляє email
3. Користувач переходить по посиланню в email
4. При першому переході - статус 200, email верифіковано
5. При повторному переході - статус 404
6. Логін можливий тільки після верифікації email

### 6. Тестування

1. Запустіть сервер: `npm run dev`
2. Зареєструйте нового користувача
3. Перевірте email (включаючи папку спам)
4. Перейдіть по посиланню верифікації
5. Спробуйте увійти в систему
