import sqlite3

# 1. Създаване / Свързване с база данни
conn = sqlite3.connect("example.db")  # Ако няма такава база, ще я създаде
cursor = conn.cursor()

# 2. Създаване на таблица
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER,
    email TEXT UNIQUE
)
''')

# 3. Добавяне на записи
cursor.execute("INSERT INTO users (name, age, email) VALUES (?, ?, ?)",
               ("Иван Иванов", 30, "ivan@example.com"))

# 4. Извличане на данни
cursor.execute("SELECT * FROM users")
users = cursor.fetchall()
print("Потребители в базата:", users)

# 5. Актуализация на данни
cursor.execute("UPDATE users SET age = ? WHERE name = ?", (31, "Иван Иванов"))

# 6. Изтриване на данни
cursor.execute("DELETE FROM users WHERE name = ?", ("Иван Иванов",))

# 7. Запазване на промените и затваряне на връзката
conn.commit()
conn.close()
