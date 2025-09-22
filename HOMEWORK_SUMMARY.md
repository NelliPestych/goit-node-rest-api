# Домашнє завдання 6 - Email Verification

## Виконані завдання

### ✅ Крок 1: Підготовка інтеграції з API ukr.net
- Встановлено пакет `nodemailer`
- Створено сервіс `emailService.js` для відправки email через ukr.net SMTP
- Налаштовано конфігурацію для ukr.net (smtp.ukr.net:465)

### ✅ Крок 2: Створення ендпоінта для верифікації email
- **Оновлено модель User** - додано поля:
  - `verify` (BOOLEAN, defaultValue: false)
  - `verificationToken` (STRING)
- **Створено ендпоінт GET /auth/verify/:verificationToken**:
  - Пошук користувача за verificationToken
  - Обробка випадку "User not found" (404)
  - Встановлення verificationToken = null та verify = true при успішній верифікації
  - Повернення статусу 200 з повідомленням "Verification successful"

### ✅ Крок 3: Додавання відправки email користувачу з посиланням для верифікації
- **Генерація verificationToken** при реєстрації користувача (використовується nanoid)
- **Формування та відправка email** з посиланням для верифікації
- **Перевірка верифікації email** при логіні користувача (блокування входу для неверифікованих)

### ✅ Крок 4: Додавання повторної відправки email користувачу
- **Створено ендпоінт POST /auth/verify** для повторної відправки
- **Валідація email** у body запиту (обов'язкове поле email)
- **Повторна відправка листа** з verificationToken тільки для неверифікованих користувачів
- **Обробка випадку** коли користувач вже верифікований (помилка 400)

## Створені файли

1. **services/emailService.js** - сервіс для відправки email
2. **db/add_verification_fields.sql** - міграція для додавання полів верифікації
3. **env.example** - приклад змінних середовища
4. **README-EMAIL-VERIFICATION.md** - документація по налаштуванню
5. **HOMEWORK_SUMMARY.md** - цей файл з підсумком

## Оновлені файли

1. **models/User.js** - додано поля verify та verificationToken
2. **controllers/authControllers.js** - додано функції верифікації та оновлено реєстрацію/логін
3. **routes/authRouter.js** - додано роути для верифікації
4. **schemas/authSchemas.js** - додано схему валідації для повторної відправки

## API Endpoints

### Реєстрація
```
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Верифікація email
```
GET /api/auth/verify/:verificationToken
```

### Повторна відправка верифікації
```
POST /api/auth/verify
{
  "email": "user@example.com"
}
```

### Логін (тільки для верифікованих)
```
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

## Налаштування

1. Додайте змінні середовища до `.env`:
   ```env
   UKR_NET_EMAIL=your_email@ukr.net
   UKR_NET_PASSWORD=your_app_password
   BASE_URL=http://localhost:3000
   ```

2. Виконайте міграцію бази даних:
   ```sql
   \i db/add_verification_fields.sql
   ```

3. Налаштуйте ukr.net для SMTP (створіть пароль додатку)

## Процес верифікації

1. Користувач реєструється → отримує email з посиланням
2. Переходить по посиланню → email верифіковано (статус 200)
3. Повторний перехід → помилка 404
4. Логін можливий тільки після верифікації

## Критерії прийому

- ✅ Створено репозиторій з домашнім завданням
- ✅ Код відповідає технічному завданню проєкту
- ✅ У коді немає закоментованих ділянок коду
- ✅ Проєкт коректно працює з актуальною LTS-версією Node
- ✅ Всі ендпоінти реалізовані згідно з вимогами
- ✅ Додано валідацію та обробку помилок
- ✅ Створено документацію для налаштування
