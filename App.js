import ProtectedRoute from './components/ProtectedRoute';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import AdminDashboard from './pages/AdminDashboard';
import ClientDashboard from './pages/ClientDashboard';
import ClientProfile from './pages/ClientProfile';
import BookAppointment from './pages/BookAppointment';
import Appointments from './pages/Appointments';

const AuthButtons = () => {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    const isAdmin = isAuthenticated && user?.email === "admin@autoservice.bg";

    return (
        <div className="auth-buttons-container">
            {isAuthenticated ? (
                <>
                    <p className="welcome-text">Здравей, <strong>{user.name}</strong></p>
                    {isAdmin && <p className="admin-badge">🔐 Администратор</p>}
                    <button className="logout-button" onClick={() => logout({ returnTo: window.location.origin })}>Изход</button>
                </>
            ) : (
                <button className="login-button" onClick={() => loginWithRedirect()}>Вход / Регистрация</button>
            )}
        </div>
    );
};

function App() {
    return (
        <Auth0Provider
            domain="dev-xrz6hy2gmxkad1e0.us.auth0.com"
            clientId="r1lwEkz7vjbKePIpgJCzTYzWyqchNwjz"
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: "https://dev-xrz6hy2gmxkad1e0.us.auth0.com/api/v2/",
                scope: "openid profile email"
            }}
        >
            <Router>
                <Header />
                <Nav />
                <AuthButtons />
                <main className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/contacts" element={<Contacts />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<ClientProfile />} />
                        <Route path="/book" element={<BookAppointment />} />
                        <Route path="/appointments" element={<Appointments />} />
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute requireAdmin={true}>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <ClientDashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </main>
                <Footer />
            </Router>
        </Auth0Provider>
    );
}

export default App;




