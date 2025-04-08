// Това е формата за записване на час. Оттук клиентите записват час. Информацията след това отива в акаунта на админа, където се съхранява.
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const BookAppointment = () => {
    const { user } = useAuth0();
    const [form, setForm] = useState({ date: '', time: '', description: '' });
    const [message, setMessage] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: user.email, ...form })
            });

            const data = await response.json();
            setMessage(data.message || data.error);
        } catch (error) {
            setMessage('Грешка при изпращане на заявката.');
        }
    };

    return (
        <div className="container">
            <h2>Записване на час</h2>
            <form onSubmit={handleSubmit}>
                <label>Дата:</label><br />
                <input type="date" name="date" onChange={handleChange} required /><br />

                <label>Час:</label><br />
                <input type="time" name="time" onChange={handleChange} required /><br />

                <label>Описание:</label><br />
                <textarea name="description" onChange={handleChange} required /><br />

                <button type="submit">Запиши час</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default BookAppointment;
