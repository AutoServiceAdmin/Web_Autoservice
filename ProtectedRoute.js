// src/components/ProtectedRoute.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { isAuthenticated, user, isLoading } = useAuth0();

    if (isLoading) return <p>Зареждане...</p>;

    const isAdmin = user?.email === "admin@autoservice.bg";

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
