# REST API з аутентифікацією та авторизацією

## Встановлення

1. Встановіть залежності:
```bash
npm install
```

2. Створіть файл `.env` в корені проекту з наступним вмістом:
```env
JWT_SECRET=your-super-secret-jwt-key-here
```

3. Запустіть сервер:
```bash
npm run dev
```

## API Endpoints

### Аутентифікація

#### Реєстрація
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "example@example.com",
  "password": "examplepassword"
}
```

**Відповідь (201):**
```json
{
  "user": {
    "email": "example@example.com",
    "subscription": "starter"
  }
}
```

#### Логін
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "example@example.com",
  "password": "examplepassword"
}
```

**Відповідь (200):**
```json
{
  "token": "jwt-token-here",
  "user": {
    "email": "example@example.com",
    "subscription": "starter"
  }
}
```

#### Логаут
```http
POST /api/auth/logout
Authorization: Bearer {{token}}
```

**Відповідь (204):** No Content

#### Поточний користувач
```http
GET /api/auth/current
Authorization: Bearer {{token}}
```

**Відповідь (200):**
```json
{
  "email": "example@example.com",
  "subscription": "starter"
}
```

#### Оновлення підписки
```http
PATCH /api/auth/subscription
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "subscription": "pro"
}
```

**Відповідь (200):**
```json
{
  "email": "example@example.com",
  "subscription": "pro"
}
```

### Контакти (потребують аутентифікації)

#### Отримати всі контакти
```http
GET /api/contacts
Authorization: Bearer {{token}}
```

#### Отримати контакт за ID
```http
GET /api/contacts/:id
Authorization: Bearer {{token}}
```

#### Створити контакт
```http
POST /api/contacts
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890"
}
```

#### Оновити контакт
```http
PUT /api/contacts/:id
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "+9999999999"
}
```

#### Видалити контакт
```http
DELETE /api/contacts/:id
Authorization: Bearer {{token}}
```

#### Оновити статус favorite
```http
PATCH /api/contacts/:contactId/favorite
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "favorite": true
}
```

## Особливості

- **JWT аутентифікація** - всі контакти захищені токенами
- **Власність контактів** - кожен користувач бачить тільки свої контакти
- **Хешування паролів** - використовується bcryptjs
- **Валідація даних** - всі вхідні дані валідуються за допомогою Joi
- **Підписки користувачів** - starter, pro, business
- **Автоматичне створення таблиць** - при запуску сервера

## Структура бази даних

### Таблиця users
- `id` - первинний ключ
- `email` - унікальний email
- `password` - хешований пароль
- `subscription` - тип підписки (starter, pro, business)
- `token` - JWT токен (null після логауту)
- `createdAt`, `updatedAt` - timestamps

### Таблиця contacts
- `id` - первинний ключ
- `name` - ім'я контакту
- `email` - email контакту
- `phone` - телефон контакту
- `favorite` - чи в обраному (boolean)
- `owner` - ID власника контакту
- `createdAt`, `updatedAt` - timestamps
