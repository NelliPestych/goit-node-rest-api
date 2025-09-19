-- Міграція для додавання полів верифікації email до таблиці users
-- Виконайте цей скрипт в pgAdmin або DBeaver після підключення до бази даних

-- Додаємо поля verify та verificationToken до таблиці users
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS verify BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS verificationToken VARCHAR(255);

-- Створюємо індекс для verificationToken для швидкого пошуку
CREATE INDEX IF NOT EXISTS idx_users_verification_token ON users(verificationToken);

-- Створюємо індекс для verify для швидкого пошуку
CREATE INDEX IF NOT EXISTS idx_users_verify ON users(verify);
