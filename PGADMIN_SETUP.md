# Установка и настройка pgAdmin

## Что такое pgAdmin?

pgAdmin - это веб-интерфейс для управления базами данных PostgreSQL. Он предоставляет удобный графический интерфейс для работы с базами данных.

## Установка pgAdmin

### Для Windows:

1. Перейдите на [официальный сайт pgAdmin](https://www.pgadmin.org/download/pgadmin-4-windows/)
2. Скачайте последнюю версию для Windows
3. Запустите установщик и следуйте инструкциям
4. После установки pgAdmin запустится автоматически

### Для macOS:

1. Перейдите на [официальный сайт pgAdmin](https://www.pgadmin.org/download/pgadmin-4-macos/)
2. Скачайте последнюю версию для macOS
3. Откройте скачанный .dmg файл
4. Перетащите pgAdmin в папку Applications
5. Запустите pgAdmin из папки Applications

### Для Linux (Ubuntu/Debian):

```bash
# Установка через репозиторий
curl -fsS https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /usr/share/keyrings/packages-pgadmin-org.gpg

sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/packages-pgadmin-org.gpg] https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list'

sudo apt update
sudo apt install pgadmin4
```

## Первый запуск pgAdmin

1. Запустите pgAdmin
2. При первом запуске вас попросят создать мастер-пароль
3. Запомните этот пароль - он понадобится для доступа к pgAdmin

## Подключение к базе данных Render

### Шаг 1: Добавление нового сервера

1. В левой панели нажмите правой кнопкой мыши на "Servers"
2. Выберите "Register" → "Server..."

### Шаг 2: Настройка подключения

#### Вкладка "General":
- **Name**: `Render DB Contacts` (или любое удобное имя)

#### Вкладка "Connection":
- **Host name/address**: `your-db-name.render.com` (хост от Render)
- **Port**: `5432`
- **Maintenance database**: `db-contacts`
- **Username**: ваше имя пользователя от Render
- **Password**: ваш пароль от Render

### Шаг 3: Сохранение подключения

1. Нажмите "Save"
2. Введите мастер-пароль pgAdmin при запросе
3. Сервер появится в левой панели

## Создание таблицы contacts

### Способ 1: Через SQL Editor

1. В левой панели разверните ваш сервер
2. Разверните "Databases" → "db-contacts"
3. Правой кнопкой мыши на "db-contacts" → "Query Tool"
4. Вставьте SQL код из файла `db/create_table.sql`
5. Нажмите F5 или кнопку "Execute"

### Способ 2: Через графический интерфейс

1. Правой кнопкой мыши на "Tables" → "Create" → "Table..."
2. Заполните поля:
   - **Name**: `contacts`
   - **Columns**:
     - `id` (SERIAL, PRIMARY KEY)
     - `name` (VARCHAR(255), NOT NULL)
     - `email` (VARCHAR(255), NOT NULL)
     - `phone` (VARCHAR(30), NOT NULL)
     - `favorite` (BOOLEAN, DEFAULT FALSE)
     - `createdAt` (TIMESTAMP WITH TIME ZONE, NOT NULL)
     - `updatedAt` (TIMESTAMP WITH TIME ZONE, NOT NULL)

## Проверка подключения

1. В левой панели разверните ваш сервер
2. Если подключение успешно, вы увидите:
   - Databases
   - Login/Group Roles
   - Catalogs
   - etc.

3. Разверните "Databases" → "db-contacts" → "Schemas" → "public" → "Tables"
4. Вы должны увидеть таблицу `contacts`

## Полезные функции pgAdmin

### Просмотр данных:
- Правой кнопкой мыши на таблицу → "View/Edit Data" → "All Rows"

### Выполнение SQL запросов:
- Правой кнопкой мыши на базу данных → "Query Tool"

### Экспорт данных:
- Правой кнопкой мыши на таблицу → "Backup..."

### Мониторинг:
- В правой панели можно видеть статистику по базе данных

## Устранение неполадок

### Ошибка "Connection refused"
- Проверьте правильность хоста
- Убедитесь, что база данных активна в Render

### Ошибка "Authentication failed"
- Проверьте username и password
- Убедитесь, что пользователь имеет права доступа

### pgAdmin не запускается
- Проверьте, что все зависимости установлены
- Попробуйте переустановить pgAdmin

## Альтернативы pgAdmin

Если pgAdmin не подходит, можете использовать:

- **DBeaver** - универсальный клиент для баз данных
- **TablePlus** - современный и удобный интерфейс
- **DataGrip** от JetBrains (платный, но очень мощный)
