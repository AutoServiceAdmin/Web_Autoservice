import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <h2>🔧 Администраторски панел</h2>
            <p>Добре дошли в панела за управление на сервиза.</p>
            <div className="admin-options">
                <div className="admin-box">📋 Преглед на всички записани часове</div>
                <div className="admin-box">🧾 Преглед на информация за клиенти</div>
                <div className="admin-box">❌ Отказване на часове</div>
            </div>
        </div>
    );
};

export default AdminDashboard;
