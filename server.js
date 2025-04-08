require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'fallbacksecret';

app.use(express.json());
app.use(cors());

// Свързване към база данни
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) console.error('Грешка в базата:', err.message);
    else console.log('Свързан към база данни!');
});

// Създаване на таблици за потребители и записани часове
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    date TEXT,
    time TEXT,
    description TEXT
)`);

// Регистрация
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return res.status(400).json({ error: 'Потребителското име трябва да бъде на латиница!' });
    }

    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)) {
        return res.status(400).json({ error: 'Паролата трябва да съдържа поне 6 символа, главна буква, цифра и специален знак!' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
        if (err) return res.status(400).json({ error: 'Потребителското име вече съществува!' });
        res.json({ message: 'Регистрацията е успешна!' });
    });
});

// Вход
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ error: 'Грешно потребителско име или парола!' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Входът е успешен!', token });
    });
});

// Записване на час
app.post('/appointments', (req, res) => {
    const { username, date, time, description } = req.body;

    db.run(`INSERT INTO appointments (username, date, time, description) VALUES (?, ?, ?, ?)`,
        [username, date, time, description], function(err) {
        if (err) return res.status(500).json({ error: 'Грешка при записване на час' });
        res.json({ message: 'Часът е записан успешно!' });
    });
});

// Извличане на записани часове
app.get('/appointments', (req, res) => {
    db.all(`SELECT * FROM appointments`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Грешка при извличане на данните' });
        res.json(rows);
    });
});

// Основен маршрут за проверка на сървъра
app.get("/", (req, res) => {
    res.send("Сървърът работи!");
});

// Стартиране на сървъра
app.listen(PORT, () => {
    console.log(`Сървърът работи на http://localhost:${PORT}`);
});
