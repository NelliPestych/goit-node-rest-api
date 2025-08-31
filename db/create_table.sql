-- SQL скрипт для создания таблицы contacts
-- Выполните этот скрипт в pgAdmin или DBeaver после подключения к базе данных

CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    favorite BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Создание индексов для улучшения производительности
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_favorite ON contacts(favorite);

-- Вставка тестовых данных (опционально)
INSERT INTO contacts (name, email, phone, favorite) VALUES
    ('John Doe', 'john@example.com', '+1234567890', true),
    ('Jane Smith', 'jane@example.com', '+0987654321', false),
    ('Bob Johnson', 'bob@example.com', '+1122334455', true)
ON CONFLICT DO NOTHING;

-- Проверка созданной таблицы
SELECT * FROM contacts;
