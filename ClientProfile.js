import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ClientProfile = () => {
  const { user } = useAuth0();

  return (
    <div className="profile-container">
      <h2>👤 Моят профил</h2>
      <div className="profile-card">
        <p><strong>Име:</strong> {user.name}</p>
        <p><strong>Имейл:</strong> {user.email}</p>
        <p><strong>Профил създаден:</strong> {new Date(user.updated_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ClientProfile;
