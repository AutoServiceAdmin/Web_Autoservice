// src/pages/AdminPanel.js
import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/appointments')
            .then(res => res.json())
            .then(data => setAppointments(data))
            .catch(err => console.error('Грешка при зареждане:', err));
    }, []);

    return (
        <section className="admin-panel">
            <h2>📋 Записани часове</h2>
            {appointments.length === 0 ? (
                <p>Няма записани часове.</p>
            ) : (
                <ul className="appointment-list">
                    {appointments.map((item) => (
                        <li key={item.id}>
                            <strong>{item.username}</strong> — {item.date}, {item.time}<br />
                            <em>{item.description}</em>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default AdminPanel;
