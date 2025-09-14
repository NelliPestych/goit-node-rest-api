# REST API з підтримкою аватарок

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

#### Реєстрація (з автоматичним gravatar)
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
    "subscription": "starter",
    "avatarURL": "//www.gravatar.com/avatar/..."
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
    "subscription": "starter",
    "avatarURL": "//www.gravatar.com/avatar/..."
  }
}
```

#### Оновлення аватарки
```http
PATCH /api/auth/avatars
Authorization: Bearer {{token}}
Content-Type: multipart/form-data

avatar: [файл зображення]
```

**Відповідь (200):**
```json
{
  "avatarURL": "/avatars/avatar-1-1234567890-123456789.png"
}
```

#### Поточний користувач
```http
GET /api/auth/current
Authorization: Bearer {{token}}
```

**Відповідь (200):**
```json
{
  "email": "example@example.com",
  "subscription": "starter",
  "avatarURL": "/avatars/avatar-1-1234567890-123456789.png"
}
```

### Статичні файли

#### Доступ до аватарки
```http
GET /avatars/{filename}
```

**Відповідь (200):** Зображення аватарки

## Особливості

- **Автоматичний gravatar** - при реєстрації генерується gravatar на основі email
- **Завантаження аватарок** - можливість завантажити власну аватарку
- **Статичний сервер** - аватарки доступні через HTTP
- **Валідація файлів** - приймаються тільки зображення
- **Унікальні імена** - файли отримують унікальні імена
- **Обмеження розміру** - максимальний розмір файлу 5MB

## Структура папок

```
project/
├── public/
│   └── avatars/          # Публічні аватарки
├── temp/                 # Тимчасові файли
├── __tests__/            # Unit тести
└── ...
```

## Тестування

Запуск тестів:
```bash
npm test
```

Запуск тестів з покриттям:
```bash
npm run test:coverage
```

## Технічні деталі

- **Multer** - для завантаження файлів
- **Gravatar** - для генерації аватарів
- **Jest** - для unit тестування
- **Express.static** - для роздачі статичних файлів
- **Валідація типів файлів** - тільки зображення
- **Обробка помилок** - видалення тимчасових файлів при помилках
