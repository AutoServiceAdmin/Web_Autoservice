import React from 'react';
import { Link } from 'react-router-dom';

const ClientDashboard = () => {
  return (
    <div className="client-dashboard-container">
      <h2>👋 Добре дошъл в клиентския си профил!</h2>
      <p>Използвайте панела по-долу, за да управлявате своите услуги.</p>

      <div className="dashboard-buttons">
        <Link to="/appointments">
          <button>📅 Запиши час</button>
        </Link>
        <Link to="/profile">
          <button>👤 Профил</button>
        </Link>
      </div>
    </div>
  );
};

export default ClientDashboard;
